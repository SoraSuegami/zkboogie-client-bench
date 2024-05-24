import { expose, proxy } from 'comlink';
import { groth16 } from "snarkjs";

export type MultiThreads = typeof import('zkboogie');

let multiThreads: MultiThreads | null = null;
/**
 * Initialize the multi-threaded WASM module.
 * @returns The multi-threaded WASM module.
 */
export async function initMultiThreads(): Promise<MultiThreads> {
    if (multiThreads !== null) {
        console.log("multiThreads already initialized");
        return multiThreads;
    }
    multiThreads = await _initMultiThreads();
    return multiThreads;
}

async function _initMultiThreads(): Promise<MultiThreads> {
    const _multiThreads = await import(
        'zkboogie'
    );
    console.log(_multiThreads);
    await _multiThreads.default();
    console.log(`hardware: ${navigator.hardwareConcurrency}`);
    await _multiThreads.initThreadPool(navigator.hardwareConcurrency);
    console.log("initThreadPool");
    await _multiThreads.init_panic_hook();
    return _multiThreads;
}

export async function genCircuit(num_input: number, num_add: number, num_mul: number): Promise<Uint8Array> {
    const multiThreads = await initMultiThreads();
    return multiThreads.gen_random_circuit(num_input, num_add, num_mul);
}

export async function zkboogieProve(circuit: Uint8Array, num_input: number): Promise<number> {
    try {
        const multiThreads = await initMultiThreads();
        const hasher_prefix = new Uint32Array(0);
        let input = Array(num_input).fill('0x' + '0'.repeat(64));
        const start = performance.now();
        const proof = multiThreads.zkboogie_prove_wasm(100, hasher_prefix, circuit, input);
        console.log(`proof size: ${proof.length}`);
        return performance.now() - start;
    } catch (e) {
        console.error(e);
        multiThreads = await _initMultiThreads();
        throw e;
    }
}

// export async function fetchWasm(wasm_path: string): Promise<Uint8Array> {
//     const wasmBuffer = await fetch(wasm_path).then(res => res.arrayBuffer());
//     return new Uint8Array(wasmBuffer);
// }

export async function groth16Prove(wasm_path: string, zkey_path: string, num_input: number): Promise<[number, number]> {
    const input = { in: Array(num_input).fill(0) };
    let start = performance.now();
    const wasmBuffer = await fetch(wasm_path, {
        mode: 'cors'
    }).then(res => res.arrayBuffer());
    // console.log(wasmBuffer);
    const wasm = new Uint8Array(wasmBuffer);
    // console.log(wasm);
    const zkeyBuffer = await fetch(zkey_path, {
        mode: 'cors'
    }).then(res => res.arrayBuffer());
    const zkey = new Uint8Array(zkeyBuffer);
    console.log(`zkey size: ${zkey.length}`)
    const downloadTime = performance.now() - start;
    start = performance.now();
    await groth16.fullProve(input, wasm, zkey, console);
    const proveTime = performance.now() - start;
    return [downloadTime, proveTime];
}

const exports = {
    initMultiThreads,
    genCircuit,
    zkboogieProve,
    groth16Prove
};
expose(exports);
export type Worker = typeof exports;
