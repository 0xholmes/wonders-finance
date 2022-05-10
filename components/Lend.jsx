import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import WondersFinanceABI from "../artifacts/contracts/WondersFinance.sol/WondersFinance.json";
const WondersFinanceAddr = "0x6dF579FF0525B7eb42096B60c3D78A80891CB859";

const Lend = () => {
  const [toggle, setToggle] = useState(false);
  const [amount, setAmount] = useState("");
  const [tvl, setTvl] = useState("");

  const deposit = async amount => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      WondersFinanceAddr,
      WondersFinanceABI.abi,
      signer
    );
    const options = { value: ethers.utils.parseEther(amount) };
    const tx = await contract.deposit(options);
    tx.wait();
  };

  const getTvl = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      WondersFinanceAddr,
      WondersFinanceABI.abi,
      signer
    );
    const tx = await contract.tvl();
    setTvl(ethers.utils.formatEther(tx._hex));
  };

  useEffect(() => {
    getTvl();
  }, []);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col w-3/5 text-white">
        <h1 className="my-10 text-4xl text-center">Assets to supply</h1>
        <div className="flex w-full bg-violet-700 p-5 rounded-lg mb-3">
          <p className="mr-28">Assets</p>
          <p className="mr-32">~YIELD PER 0.01 ETH</p>
          <p className="mr-40">APR</p>
          <p>TVL (ETH)</p>
        </div>
        <div className="flex justify-between w-full bg-violet-500 px-5 py-10 rounded-lg">
          <div className="flex">
            <img
              className="h-7 w-full my-auto"
              src="../img/eth-logo.png"
              alt=""
            />
            <p className="py-2 pl-2 pr-4">ETH</p>
          </div>
          <p className="py-2 px-4">~8.66 $1DER/day</p>
          <p className="py-2 px-4">100.00%</p>
          <p className="py-2 px-4">{tvl} ETH</p>
          <button
            className="cursor-pointer bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setToggle(true)}
          >
            Deposit
          </button>
        </div>
      </div>

      {toggle && (
        <div className="bg-black bg-opacity-40 absolute inset-0 flex justify-center items-center">
          <div className="flex flex-col justify-center w-1/3 h-1/2 bg-violet-400 px-8 rounded-lg text-white">
            <div className="flex justify-between">
              <h1 className="mb-12 text-4xl">Supply ETH</h1>
              <p
                className="text-4xl cursor-pointer"
                onClick={() => setToggle(false)}
              >
                X
              </p>
            </div>
            <div className="my-1">
              <p className="text-lg mb-1">Amount</p>
              <input
                type="number"
                className="mb-12 shadow appearance-none border rounded w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>
            <button
              className="cursor-pointer bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-4 rounded"
              onClick={() => deposit(amount)}
            >
              Deposit ETH
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lend;
