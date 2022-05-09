import { useState, useEffect } from "react";
import { ethers } from "ethers";

import WondersFinanceABI from "../artifacts/contracts/WondersFinance.sol/WondersFinance.json";
const WondersFinanceAddr = "0x6dF579FF0525B7eb42096B60c3D78A80891CB859";

function App() {
  const [amount, setAmount] = useState("");

  const connectWallet = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  };

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

  const tvl = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      WondersFinanceAddr,
      WondersFinanceABI.abi,
      provider
    );
    const tvl = await contract.tvl();
    console.log(`TVL: ${(parseInt(tvl) / 10 ** 18).toString()} ETH`);
  };

  const myBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      WondersFinanceAddr,
      WondersFinanceABI.abi,
      provider
    );
    const myBalance = await contract.myBalance();
    console.log(`My balance: ${myBalance.toString()}`);
  };

  useEffect(() => {
    tvl();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={connectWallet}
      >
        Connect
      </button>

      <p>Deposit</p>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => deposit(amount)}
      >
        Deposit
      </button>
      <br />
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => withdraw()}
      >
        Withdraw
      </button>

      <p>Details</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => tvl()}
      >
        TVL
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => myBalance()}
      >
        My Balance
      </button>
    </div>
  );
}

export default App;
