import { expose, proxy } from 'comlink';
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
    const _multiThreads = await import(
        'zkboogie'
    );
    console.log(_multiThreads);
    await _multiThreads.default();
    console.log(`hardware: ${navigator.hardwareConcurrency}`);
    await _multiThreads.initThreadPool(navigator.hardwareConcurrency);
    console.log("initThreadPool");
    await _multiThreads.init_panic_hook();
    multiThreads = _multiThreads
    return multiThreads;
}

export async function genCircuit(num_input: number, num_add: number, num_mul: number): Promise<Uint8Array> {
    const multiThreads = await initMultiThreads();
    return multiThreads.gen_random_circuit(num_input, num_add, num_mul);
}

export async function zkboogieProve(circuit: Uint8Array, num_input: number): Promise<Uint8Array> {
    try {
        const multiThreads = await initMultiThreads();
        const hasher_prefix = new Uint32Array(0);
        let input = Array(num_input).fill('0x' + '0'.repeat(64));
        return multiThreads.zkboogie_prove_wasm(100, hasher_prefix, circuit, input);
    } catch (e) {
        console.error(e);
        throw e;
    }
}

const exports = {
    initMultiThreads,
    genCircuit,
    zkboogieProve
};
expose(exports);
export type Worker = typeof exports;
