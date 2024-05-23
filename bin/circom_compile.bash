#!/bin/bash

cd "$(dirname "$0")"

files=$(find ../bench_circoms -type f)

for file in $files
do
  circom $file --r1cs --sym --wasm -o ../build  
done

for i in {8..20}
do
  j=$((i+1))
  wget https://storage.googleapis.com/zkevm/ptau/powersOfTau28_hez_final_$(printf "%02d" $j).ptau -O ../build/$(printf "%02d" $j).ptau
  snarkjs groth16 setup ../build/input128_add$(bc <<< "2^$i")_mul$(bc <<< "2^$i").r1cs ../build/$(printf "%02d" $j).ptau ../build/$(printf "%02d" $j)00.zkey
  snarkjs zkey contribute ../build/$(printf "%02d" $j)00.zkey ../build/$(printf "%02d" $j)01.zkey --name="test" -v -e="test"
  snarkjs zkey beacon ../build/$(printf "%02d" $j)01.zkey ../build/input128_add$(bc <<< "2^$i")_mul$(bc <<< "2^$i").zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"
done

# wget https://storage.googleapis.com/zkevm/ptau/powersOfTau28_hez_final_09.ptau -o ../build/09.ptau
# snarkjs groth16 setup ../build/input128_add512_mul512.r1cs ../build/09.ptau ../build/0900.zkey
# snarkjs zkey contribute ../build/0900.zkey ../build/0901.zkey --name="test" -v -e="test"
# snarkjs zkey beacon ../build/0901.zkey ../build/09.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"

# wget https://storage.googleapis.com/zkevm/ptau/powersOfTau28_hez_final_10.ptau -o ../build/10.ptau
# snarkjs groth16 setup ../build/input128_add1024_mul1024.r1cs ../build/10.ptau ../build/1000.zkey
# snarkjs zkey contribute ../build/1000.zkey ../build/1001.zkey --name="test" -v -e="test"
# snarkjs zkey beacon ../build/1001.zkey ../build/10.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"

# wget https://storage.googleapis.com/zkevm/ptau/powersOfTau28_hez_final_11.ptau -o ../build/11.ptau
# snarkjs groth16 setup ../build/input128_add2048_mul2048.r1cs ../build/11.ptau ../build/1100.zkey
# snarkjs zkey contribute ../build/1100.zkey ../build/1101.zkey --name="test" -v -e="test"
# snarkjs zkey beacon ../build/1101.zkey ../build/11.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"

