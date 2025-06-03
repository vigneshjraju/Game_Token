import React from "react";
import { ethers } from "ethers";
import { abi } from "../abi/Token.js";

const TokenCreator = () => {
  const handleCreateToken = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found!");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,  // Ensure your contract address is correctly stored in .env
      abi,
      signer
    );

    try {
      const recipientAddress = "0xcBd3d6Ea7BAc4C1e9b2C8A6F3aDde0F019C93F33";  // Replace with the recipient's address
      const amount = ethers.parseUnits("1000", 18);  // Mint 1000 tokens (adjust decimals if needed)

      // Call the createToken function
      const tx = await contract.createToken(recipientAddress, amount);
      await tx.wait();  // Wait for the transaction to be mined
      alert("Token created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating token");
    }
  };

  return (
    <div>
      <button onClick={handleCreateToken}>Create Token</button>
    </div>
  );
};

export default TokenCreator;
