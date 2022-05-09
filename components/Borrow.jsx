import React from "react";

const Borrow = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col w-3/5 text-white">
        <h1 className="my-10 text-4xl text-center">Assets to borrow</h1>
        <div className="flex justify-around w-full bg-violet-700 p-5 rounded-lg mb-3">
          <p className="">Assets</p>
          <p className="">Available</p>
          <p className="">Interest</p>
          <p>Liquidation fee</p>
        </div>
        <div className="flex justify-around w-full bg-violet-500 px-5 py-10 rounded-lg">
          <div className="flex">
            <img
              className="h-7 w-full my-auto"
              src="../img/eth-logo.png"
              alt=""
            />
            <p className="py-2 pl-2 pr-4">ETH</p>
          </div>
          <p className="py-2 px-4">1,000 ETH</p>
          <p className="py-2 px-4">1.00%</p>
          <p className="py-2 px-4">7.5%</p>
        </div>
      </div>
    </div>
  );
};

export default Borrow;
