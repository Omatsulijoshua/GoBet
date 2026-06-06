import React from "react";

interface PredictionCardProps {
  question: string;
  volume: string;
  yesPrice: number;
  noPrice: number;
}

export function PredictionCard({ question, volume, yesPrice, noPrice }: PredictionCardProps) {
  const yesPercent = Math.round(yesPrice * 100);
  const noPercent = Math.round(noPrice * 100);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition group backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="text-xs text-gray-400 font-medium px-2 py-1 rounded bg-gray-900 border border-gray-800">
            Vol: {volume}
          </div>
        </div>
        <h3 className="text-lg font-bold mb-6 leading-tight">{question}</h3>
      </div>
      
      <div className="space-y-3">
        <button className="w-full relative overflow-hidden bg-gray-900 border border-gray-800 rounded-lg py-3 px-4 flex justify-between items-center group/btn hover:border-emerald-500/50 transition">
          <div 
            className="absolute left-0 top-0 bottom-0 bg-emerald-500/10 transition-all duration-500 ease-out"
            style={{ width: `${yesPercent}%` }}
          />
          <span className="font-bold text-emerald-400 relative z-10">YES</span>
          <span className="font-bold text-white relative z-10">{yesPrice.toFixed(2)}</span>
        </button>
        <button className="w-full relative overflow-hidden bg-gray-900 border border-gray-800 rounded-lg py-3 px-4 flex justify-between items-center group/btn hover:border-rose-500/50 transition">
          <div 
            className="absolute left-0 top-0 bottom-0 bg-rose-500/10 transition-all duration-500 ease-out"
            style={{ width: `${noPercent}%` }}
          />
          <span className="font-bold text-rose-400 relative z-10">NO</span>
          <span className="font-bold text-white relative z-10">{noPrice.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}
