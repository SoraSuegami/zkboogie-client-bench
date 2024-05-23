import React, { useEffect, useState } from 'react';
import { wrap } from 'comlink';
// import { fetchWasm } from './worker';

const listData = [
  // { description: 'ZKBoogie: 128-bit input, 128 addition, 128 multiplication (256 = 2^8 gates)', id: 0 },
  { description: 'ZKBoogie: 128-bit input, 256 addition, 256 multiplication (512 = 2^9 gates)', id: 1 },
  { description: 'Groth16: 128-bit input, 256 addition, 256 multiplication (512 = 2^9 gates)', id: 14 },

  { description: 'ZKBoogie: 128-bit input, 512 addition, 512 multiplication (1024 = 2^10 gates)', id: 2 },
  { description: 'Groth16: 128-bit input, 512 addition, 512 multiplication (1024 = 2^10 gates)', id: 15 },

  { description: 'ZKBoogie: 128-bit input, 1024 addition, 1024 multiplication (2048 = 2^11 gates)', id: 3 },
  { description: 'Groth16: 128-bit input, 1024 addition, 1024 multiplication (2048 = 2^11 gates)', id: 16 },

  { description: 'ZKBoogie: 128-bit input, 2048 addition, 2048 multiplication (4096 = 2^12 gates)', id: 4 },
  { description: 'Groth16: 128-bit input, 2048 addition, 2048 multiplication (4096 = 2^12 gates)', id: 17 },

  { description: 'ZKBoogie: 128-bit input, 4096 addition, 4096 multiplication (8192 = 2^13 gates)', id: 5 },
  { description: 'Groth16: 128-bit input, 4096 addition, 4096 multiplication (8192 = 2^13 gates)', id: 18 },

  { description: 'ZKBoogie: 128-bit input, 8192 addition, 8192 multiplication (16384 = 2^14 gates)', id: 6 },
  { description: 'Groth16: 128-bit input, 8192 addition, 8192 multiplication (16384 = 2^14 gates)', id: 19 },

  { description: 'ZKBoogie: 128-bit input, 16384 addition, 16384 multiplication (32768 = 2^15 gates)', id: 7 },
  { description: 'Groth16: 128-bit input, 16384 addition, 16384 multiplication (32768 = 2^15 gates)', id: 20 },

  // { description: 'ZKBoogie: 128-bit input, 32768 addition, 32768 multiplication (65536 = 2^16 gates)', id: 8 },
  // { description: 'ZKBoogie: 128-bit input, 65536 addition, 65536 multiplication (131072 = 2^17 gates)', id: 9 },
  // { description: 'ZKBoogie: 128-bit input, 131072 addition, 131072 multiplication (262144 = 2^18 gates)', id: 10 },
  // { description: 'ZKBoogie: 128-bit input, 262144 addition, 262144 multiplication (524288 = 2^19 gates)', id: 11 },
  // { description: 'ZKBoogie: 128-bit input, 524288 addition, 524288 multiplication (1048576 = 2^20 gates)', id: 12 },
  // { description: 'Groth16: 128-bit input, 128 addition, 128 multiplication (256 = 2^8 gates)', id: 13 },
];

const worker = new Worker(new URL('./worker', import.meta.url), {
  name: 'worker',
  type: 'module',
});
const workerApis = wrap<import('./worker').Worker>(worker);

async function f(id: number) {
  switch (id) {
    case 0: {
      let circuit = await workerApis.genCircuit(128, 128, 128);
      console.log(circuit);
      const time = await workerApis.zkboogieProve(circuit, 128);
      return `Proving time: ${time} ms`;
    }
    case 1: {
      let circuit = await workerApis.genCircuit(128, 256, 256);
      console.log(circuit);
      const time = await workerApis.zkboogieProve(circuit, 128);
      return `Proving time: ${time} ms`;
    }
    case 2: {
      let circuit = await workerApis.genCircuit(128, 512, 512);
      console.log(circuit);
      const time = await workerApis.zkboogieProve(circuit, 128);
      return `Proving time: ${time} ms`;
    }
    case 3: {
      let circuit = await workerApis.genCircuit(128, 1024, 1024);
      console.log(circuit);
      const time = await workerApis.zkboogieProve(circuit, 128);
      return `Proving time: ${time} ms`;
    }
    case 4: {
      let circuit = await workerApis.genCircuit(128, 2048, 2048);
      console.log(circuit);
      const time = await workerApis.zkboogieProve(circuit, 128);
      return `Proving time: ${time} ms`;
    }
    case 5: {
      let circuit = await workerApis.genCircuit(128, 4096, 4096);
      console.log(circuit);
      const time = await workerApis.zkboogieProve(circuit, 128);
      return `Proving time: ${time} ms`;
    }
    case 6: {
      let circuit = await workerApis.genCircuit(128, 8192, 8192);
      console.log(circuit);
      const time = await workerApis.zkboogieProve(circuit, 128);
      return `Proving time: ${time} ms`;
    }
    case 7: {
      let circuit = await workerApis.genCircuit(128, 16384, 16384);
      console.log(circuit);
      const time = await workerApis.zkboogieProve(circuit, 128);
      return `Proving time: ${time} ms`;
    }
    case 8: {
      let circuit = await workerApis.genCircuit(128, 32768, 32768);
      console.log(circuit);
      const time = await workerApis.zkboogieProve(circuit, 128);
      return `Proving time: ${time} ms`;
    }
    case 9: {
      let circuit = await workerApis.genCircuit(128, 65536, 65536);
      console.log(circuit);
      const time = await workerApis.zkboogieProve(circuit, 128);
      return `Proving time: ${time} ms`;
    }
    case 10: {
      let circuit = await workerApis.genCircuit(128, 131072, 131072);
      console.log(circuit);
      const time = await workerApis.zkboogieProve(circuit, 128);
      return `Proving time: ${time} ms`;
    }
    case 11: {
      let circuit = await workerApis.genCircuit(128, 262144, 262144);
      console.log(circuit);
      const time = await workerApis.zkboogieProve(circuit, 128);
      return `Proving time: ${time} ms`;
    }
    case 12: {
      let circuit = await workerApis.genCircuit(128, 524288, 524288);
      console.log(circuit);
      const time = await workerApis.zkboogieProve(circuit, 128);
      return `Proving time: ${time} ms`;
    }
    case 14: {
      const [downloadTime, provingTime] = await workerApis.groth16Prove("https://storage.googleapis.com/zkboogie-bench-groth16-keys/input128_add256_mul256.wasm", "https://storage.googleapis.com/zkboogie-bench-groth16-keys/input128_add256_mul256.zkey", 128);
      return `Download time: ${downloadTime} ms, Proving time: ${provingTime} ms, Total time: ${downloadTime + provingTime} ms`;
    }
    case 15: {
      const [downloadTime, provingTime] = await workerApis.groth16Prove("https://storage.googleapis.com/zkboogie-bench-groth16-keys/input128_add512_mul512.wasm", "https://storage.googleapis.com/zkboogie-bench-groth16-keys/input128_add512_mul512.zkey", 128);
      return `Download time: ${downloadTime} ms, Proving time: ${provingTime} ms, Total time: ${downloadTime + provingTime} ms`;
    }
    case 16: {
      const [downloadTime, provingTime] = await workerApis.groth16Prove("https://storage.googleapis.com/zkboogie-bench-groth16-keys/input128_add1024_mul1024.wasm", "https://storage.googleapis.com/zkboogie-bench-groth16-keys/input128_add1024_mul1024.zkey", 128);
      return `Download time: ${downloadTime} ms, Proving time: ${provingTime} ms, Total time: ${downloadTime + provingTime} ms`;
    }
    case 17: {
      const [downloadTime, provingTime] = await workerApis.groth16Prove("https://storage.googleapis.com/zkboogie-bench-groth16-keys/input128_add2048_mul2048.wasm", "https://storage.googleapis.com/zkboogie-bench-groth16-keys/input128_add2048_mul2048.zkey", 128);
      return `Download time: ${downloadTime} ms, Proving time: ${provingTime} ms, Total time: ${downloadTime + provingTime} ms`;
    }
    case 18: {
      const [downloadTime, provingTime] = await workerApis.groth16Prove("https://storage.googleapis.com/zkboogie-bench-groth16-keys/input128_add4096_mul4096.wasm", "https://storage.googleapis.com/zkboogie-bench-groth16-keys/input128_add4096_mul4096.zkey", 128);
      return `Download time: ${downloadTime} ms, Proving time: ${provingTime} ms, Total time: ${downloadTime + provingTime} ms`;
    }
    case 19: {
      const [downloadTime, provingTime] = await workerApis.groth16Prove("https://storage.googleapis.com/zkboogie-bench-groth16-keys/input128_add8192_mul8192.wasm", "https://storage.googleapis.com/zkboogie-bench-groth16-keys/input128_add8192_mul8192.zkey", 128);
      return `Download time: ${downloadTime} ms, Proving time: ${provingTime} ms, Total time: ${downloadTime + provingTime} ms`;
    }
    case 20: {
      const [downloadTime, provingTime] = await workerApis.groth16Prove("https://storage.googleapis.com/zkboogie-bench-groth16-keys/input128_add16384_mul16384.wasm", "https://storage.googleapis.com/zkboogie-bench-groth16-keys/input128_add16384_mul16384.zkey", 128);
      return `Download time: ${downloadTime} ms, Proving time: ${provingTime} ms, Total time: ${downloadTime + provingTime} ms`;
    }
    default: {
      throw new Error("Invalid id");
    }
  }
}

function App() {
  // const [multiThreads, setMultiThreads] = useState<MultiThreads | null>(null);
  const [results, setResults] = useState<{ [key: number]: string }>({});


  // useEffect(() => {
  //   const init = async () => {
  //     console.log("hi?");
  //     const multiThreads = await workerApis.initMultiThreads();
  //     console.log(multiThreads);
  //     console.log("hi");
  //     setMultiThreads(multiThreads);
  //     console.log("bye");
  //   };
  //   init();
  // }, []);

  const handleClick = async (id: number) => {
    // console.log(multiThreads);
    // if (multiThreads == null) {
    //   throw new Error("multiThreads is null");
    // }
    setResults(prev => ({ ...prev, [id]: "Proving..." }));
    try {
      const result = await f(id);
      setResults(prev => ({ ...prev, [id]: result }));
    } catch (e: any) {
      setResults(prev => ({ ...prev, [id]: `Error: ${e.message}` }));
    }
  };

  return (
    <div className="App">
      <h1>ZKBoogie Benchmarks</h1>
      <h3>You can generate ZKBoogie (and groth16) proofs on your browser!</h3>
      {listData.map((item, idx) => (
        <div key={item.id}>
          <p>{item.description}</p>
          <button onClick={() => handleClick(item.id)}>Prove</button>
          {results[item.id] && <p>{results[item.id]}</p>}
          {idx % 2 === 1 && <div style={{ height: '30px' }} />}
        </div>
      ))}
    </div>
  );
}

export default App;