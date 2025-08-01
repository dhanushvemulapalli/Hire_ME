import { useState } from "react";
import { ethers } from "ethers";

const SendETH = () => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");

  const sendTransaction = async () => {
    if (!window.ethereum) {
      alert("Install MetaMask first!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to,
        value: ethers.parseEther(amount),
      });

      setTxHash(tx.hash);
      alert("Transaction sent! Check Etherscan.");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Send ETH (Testnet)</h2>
      <input
        type="text"
        placeholder="Recipient Wallet Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full p-2 border"
      />
      <input
        type="number"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border"
      />
      <button
        onClick={sendTransaction}
        className="bg-purple-600 text-white w-full p-2 rounded"
      >
        Send ETH
      </button>

      {txHash && (
        <p className="text-green-600 mt-4">
          ✅ TX Hash:{" "}
          <a
            className="underline"
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Etherscan
          </a>
        </p>
      )}
    </div>
  );
};

export default SendETH;
