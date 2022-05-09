import { ethers } from "ethers";

import WondersFinanceABI from "../artifacts/contracts/WondersFinance.sol/WondersFinance.json";
const WondersFinanceAddr = "0x6dF579FF0525B7eb42096B60c3D78A80891CB859";

const Portfolio = () => {
  const withdraw = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      WondersFinanceAddr,
      WondersFinanceABI.abi,
      signer
    );
    const tx = await contract.withdraw();
    tx.wait();
  };

  return (
    <div className="flex w-full justify-center items-center text-white">
      <button
        className="cursor-pointer bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        onClick={withdraw}
      >
        Withdraw
      </button>
    </div>
  );
};

export default Portfolio;
