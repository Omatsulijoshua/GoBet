"use client";

import React, { useState } from "react";

export function BetSlip() {
  const [stake, setStake] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);

  const selectedBet = {
    match: "Real Madrid vs Man City",
    selection: "Real Madrid",
    odds: 2.15,
  };

  const potentialPayout = stake
    ? (parseFloat(stake) * selectedBet.odds).toFixed(2)
    : "0.00";

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl">
      <div
        className="flex cursor-pointer items-center justify-between bg-indigo-600 px-4 py-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="flex items-center font-bold text-white">
          <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-indigo-600">
            1
          </span>
          Bet Slip
        </h3>
        <button className="text-white transition hover:text-gray-200">x</button>
      </div>

      <div className="border-b border-gray-800 p-4">
        <div className="mb-2 flex items-start justify-between">
          <span className="text-lg font-bold">{selectedBet.selection}</span>
          <span className="font-bold text-indigo-400">{selectedBet.odds}</span>
        </div>
        <p className="text-xs text-gray-400">{selectedBet.match}</p>
        <p className="mt-1 text-xs text-gray-500">Match Winner (1X2)</p>
      </div>

      <div className="bg-gray-900/50 p-4">
        <div className="mb-2 flex justify-between text-sm text-gray-400">
          <span>Stake ($)</span>
          <span>Balance: $1,250.00</span>
        </div>
        <div className="mb-4 flex space-x-2">
          <input
            type="number"
            value={stake}
            onChange={(event) => setStake(event.target.value)}
            placeholder="0.00"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-lg font-semibold focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="text-gray-400">Potential Payout</span>
          <span className="text-lg font-bold text-emerald-400">
            ${potentialPayout}
          </span>
        </div>

        <button className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-bold text-white transition hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]">
          Place Bet
        </button>
      </div>
    </div>
  );
}
