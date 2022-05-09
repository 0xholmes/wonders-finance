import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavbarItem = ({ item }) => {
  return (
    <li className="mx-5 py-2 cursor-pointer text-white">
      <Link className="hover:text-violet-300" to={item.toLowerCase()}>
        {item}
      </Link>
    </li>
  );
};

const Navbar = () => {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) return;
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  };

  const switchNetwork = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x3" }], // chainId must be in hexadecimal numbers
    });
  };

  useEffect(() => {
    connectWallet();
    switchNetwork();
  }, []);

  return (
    <nav className="fixed flex w-full justify-between py-6">
      <div>
        <Link to="/">
          <h1 className="ml-10 py-2 px-4 cursor-pointer text-white text-xl font-semibold">
            Wonders Finance 🧙‍♂️
          </h1>
        </Link>
      </div>
      <ul className="mr-10 flex">
        {["Lend", "Borrow", "Stake", "Portfolio", "Docs"].map((item, index) => (
          <NavbarItem key={index} item={item} />
        ))}
        <li>
          <button
            className="mx-5 cursor-pointer bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
            onClick={connectWallet}
          >
            {account ? "Connected" : "Connect"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

// Check if MetaMask is installed
// MetaMask injects the global API into window.ethereum
// if (window.ethereum) {
//   try {
//     // check if the chain to connect to is installed
//     await window.ethereum.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: "0x61" }], // chainId must be in hexadecimal numbers
//     });
//   } catch (error) {
//     // This error code indicates that the chain has not been added to MetaMask
//     // if it is not, then install it into the user MetaMask
//     if (error.code === 4902) {
//       try {
//         await window.ethereum.request({
//           method: "wallet_addEthereumChain",
//           params: [
//             {
//               chainId: "0x61",
//               rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
//             },
//           ],
//         });
//       } catch (addError) {
//         console.error(addError);
//       }
//     }
//     console.error(error);
//   }
// } else {
//   // if no window.ethereum then MetaMask is not installed
//   alert(
//     "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
//   );
// }
