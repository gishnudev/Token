import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from "./assets/MyToken.json";
import address from "./assets/deployed_addresses.json";
import "./App.css";

const App = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [mintAddress, setMintAddress] = useState("");
  const [mintAmount, setMintAmount] = useState("");

  const connectWallet = async (e) => {
    e.preventDefault();
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      const tempProvider = new ethers.BrowserProvider(window.ethereum);
      await tempProvider.send("eth_requestAccounts", []);

      const tempSigner = await tempProvider.getSigner();
      const tempContract = new ethers.Contract(
        address["MyTokenModule#MyToken"],
        ABI.abi,
        tempSigner
      );

      setProvider(tempProvider);
      setSigner(tempSigner);
      setContract(tempContract);

      const userAddress = await tempSigner.getAddress(); 
      setUserAddress(userAddress);

      const balance = await tempContract.balanceOf(userAddress);
      setBalance(ethers.formatUnits(balance, 2)); 
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      alert("Failed to connect wallet");
    }
  };

  const mintTokens = async () => {
    if (!contract) {
      alert("Connect your wallet first!");
      return;
    }
    try {
      const tx = await contract.transfer(mintAddress, ethers.parseUnits(mintAmount, 2));
      await tx.wait();
      alert(`Minted ${mintAmount} tokens to ${mintAddress}`);
    } catch (err) {
      console.error("Failed to mint tokens:", err);
      alert("Failed to mint tokens");
    }
  };


  return (
    <div
    className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center "
    style={{
      backgroundImage: "url('/src/assets/images/34532083_sl_020622_4930_23.jpg')",
    }}
  >
    <h1 className="text-8xl font-bold text-black mb-4">G Tokens</h1>
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Connect Wallet
    </button>
  
    {userAddress && (
      <div className="mt-4 text-white">
        <p className="text-lg">Connected Wallet: {userAddress}</p>
        <p className="text-lg">Token Balance: {balance} GT</p>
      </div>
    )}
  
    <div className="mt-8 space-y-4">
      <input
        type="text"
        placeholder="Recipient Address"
        className="w-full px-4 py-2 border rounded"
        value={mintAddress}
        onChange={(e) => setMintAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        className="w-full px-4 py-2 border rounded"
        value={mintAmount}
        onChange={(e) => setMintAmount(e.target.value)}
      />
      <button
        onClick={mintTokens}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Mint Tokens
      </button>
    </div>
  </div>
  
  );
};

export default App;