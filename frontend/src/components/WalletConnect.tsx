"use client";

import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export function WalletConnect() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Ethereum
  const { address: ethAddress, isConnected: isEthConnected } = useAccount();
  const { connect: connectEth, connectors } = useConnect();
  const { disconnect: disconnectEth } = useDisconnect();

  // Solana
  const { publicKey: solAddress, connected: isSolConnected, disconnect: disconnectSol } = useWallet();
  const { setVisible } = useWalletModal();

  const handleEthConnect = () => {
    const metaMask = connectors.find(c => c.name.toLowerCase().includes('metamask')) || connectors[0];
    if (metaMask) {
      connectEth({ connector: metaMask });
    }
    setIsOpen(false);
  };

  const handleSolConnect = () => {
    setVisible(true);
    setIsOpen(false);
  };

  const isConnected = isEthConnected || isSolConnected;

  const getDisplayAddress = () => {
    if (isEthConnected && ethAddress) {
      return `${ethAddress.slice(0, 6)}...${ethAddress.slice(-4)}`;
    }
    if (isSolConnected && solAddress) {
      const base58 = solAddress.toBase58();
      return `${base58.slice(0, 6)}...${base58.slice(-4)}`;
    }
    return "";
  };

  const handleDisconnect = () => {
    if (isEthConnected) disconnectEth();
    if (isSolConnected) disconnectSol();
  };

  return (
    <div className="relative">
      {!isConnected ? (
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition flex items-center space-x-2"
        >
          <span>Connect Wallet</span>
        </button>
      ) : (
        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-medium text-sm">
            {getDisplayAddress()}
          </div>
          <button 
            onClick={handleDisconnect}
            className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition text-sm font-semibold"
          >
            Disconnect
          </button>
        </div>
      )}

      {isOpen && !isConnected && (
        <div className="absolute right-0 mt-3 w-64 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50">
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-sm font-semibold text-gray-400">Select Network</h3>
          </div>
          <div className="p-2 space-y-1">
            <button 
              onClick={handleEthConnect}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition text-left group"
            >
              <div className="w-8 h-8 rounded-full bg-[#F6851B]/20 flex items-center justify-center group-hover:bg-[#F6851B]/30 transition">
                <span className="text-[#F6851B] font-bold text-xs">MM</span>
              </div>
              <div>
                <div className="font-semibold text-white">MetaMask</div>
                <div className="text-xs text-gray-500">Ethereum / Sepolia</div>
              </div>
            </button>
            <button 
              onClick={handleSolConnect}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition text-left group"
            >
              <div className="w-8 h-8 rounded-full bg-[#AB9FF2]/20 flex items-center justify-center group-hover:bg-[#AB9FF2]/30 transition">
                <span className="text-[#AB9FF2] font-bold text-xs">PH</span>
              </div>
              <div>
                <div className="font-semibold text-white">Phantom</div>
                <div className="text-xs text-gray-500">Solana / Devnet</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
