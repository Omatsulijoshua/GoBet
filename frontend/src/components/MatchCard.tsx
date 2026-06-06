import React from "react";

interface MatchCardProps {
  sport: string;
  team1: string;
  team2: string;
  odds1: number;
  oddsDraw: number | null;
  odds2: number;
}

export function MatchCard({ sport, team1, team2, odds1, oddsDraw, odds2 }: MatchCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition group backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100" />
      <div className="text-xs text-gray-400 font-medium mb-4">{sport}</div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-bold">{team1}</div>
        <div className="text-sm font-semibold text-gray-500">VS</div>
        <div className="text-lg font-bold text-right">{team2}</div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button className="bg-gray-900 border border-gray-800 hover:border-indigo-500 rounded-lg py-2 text-center transition flex flex-col items-center group/btn">
          <span className="text-xs text-gray-400 mb-1">1</span>
          <span className="font-bold text-indigo-400 group-hover/btn:text-indigo-300">{odds1.toFixed(2)}</span>
        </button>
        {oddsDraw ? (
          <button className="bg-gray-900 border border-gray-800 hover:border-gray-500 rounded-lg py-2 text-center transition flex flex-col items-center group/btn">
            <span className="text-xs text-gray-400 mb-1">X</span>
            <span className="font-bold text-gray-300 group-hover/btn:text-white">{oddsDraw.toFixed(2)}</span>
          </button>
        ) : (
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-lg py-2 text-center flex flex-col items-center opacity-50 cursor-not-allowed">
            <span className="text-xs text-gray-600 mb-1">X</span>
            <span className="font-bold text-gray-600">-</span>
          </div>
        )}
        <button className="bg-gray-900 border border-gray-800 hover:border-purple-500 rounded-lg py-2 text-center transition flex flex-col items-center group/btn">
          <span className="text-xs text-gray-400 mb-1">2</span>
          <span className="font-bold text-purple-400 group-hover/btn:text-purple-300">{odds2.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}
