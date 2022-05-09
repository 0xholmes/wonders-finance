import React from "react";

const Stake = () => {
  return (
    <div className="flex w-full justify-center items-center text-white">
      <div className="w-1/4 text-center bg-violet-700 bg-opacity-50 rounded-lg mt-12 mr-20">
        <h3 className="my-12 text-xl">Stake</h3>
        <h1 className="mb-12 text-4xl">1DER</h1>
        <div className="mb-12">
          <button className="cursor-pointer bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mr-10">
            Stake
          </button>
          <button className="cursor-pointer bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">
            Unstake
          </button>
        </div>
      </div>
      <div className="w-1/4 text-center bg-violet-700 bg-opacity-50 rounded-lg mt-12">
        <h3 className="my-12 text-xl">Reward</h3>
        <h1 className="mb-12 text-4xl">st1DER</h1>
        <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mb-12">
          Claim
        </button>
      </div>
    </div>
  );
};

export default Stake;
