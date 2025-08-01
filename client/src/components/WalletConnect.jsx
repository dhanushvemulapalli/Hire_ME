import { useEffect, useState } from "react";
import { ethers } from "ethers";

const WalletConnect = ({ onWalletConnected }) => {
  const [wallet, setWallet] = useState("");
  
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setWallet(address);
      localStorage.setItem("wallet", address);
      onWalletConnected(address); // send wallet back to parent
    } catch (err) {
      alert("Wallet connect error: " + err.message);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={connectWallet}
        className="bg-yellow-500 text-black px-4 py-2 rounded"
      >
        {wallet ? `Wallet: ${wallet.slice(0, 6)}...${wallet.slice(-4)}` : "Connect Wallet"}
      </button>
    </div>
  );
};

export default WalletConnect;
