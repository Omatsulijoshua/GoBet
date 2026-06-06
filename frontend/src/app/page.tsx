import { BetSlip } from "@/components/BetSlip";
import { MatchCard } from "@/components/MatchCard";
import { PredictionCard } from "@/components/PredictionCard";
import { WalletConnect } from "@/components/WalletConnect";

const matches = [
  {
    sport: "Football",
    team1: "Real Madrid",
    team2: "Man City",
    odds1: 2.15,
    oddsDraw: 3.4,
    odds2: 2.95,
  },
  {
    sport: "Basketball",
    team1: "Lakers",
    team2: "Warriors",
    odds1: 1.82,
    oddsDraw: null,
    odds2: 2.08,
  },
  {
    sport: "Football",
    team1: "Arsenal",
    team2: "Chelsea",
    odds1: 1.92,
    oddsDraw: 3.1,
    odds2: 3.8,
  },
];

const predictions = [
  {
    question: "Will Bitcoin close above $100k this month?",
    volume: "$24.8k",
    yesPrice: 0.62,
    noPrice: 0.38,
  },
  {
    question: "Will Solana set a new yearly high?",
    volume: "$12.1k",
    yesPrice: 0.48,
    noPrice: 0.52,
  },
  {
    question: "Will ETH outperform BTC this week?",
    volume: "$9.4k",
    yesPrice: 0.55,
    noPrice: 0.45,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-6 lg:px-12">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
            GoBet
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Live sports bets and prediction markets
          </h1>
        </div>
        <WalletConnect />
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Featured Matches</h2>
            <span className="text-sm text-gray-400">Updated live</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {matches.map((match) => (
              <MatchCard key={`${match.team1}-${match.team2}`} {...match} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Prediction Markets</h2>
            <span className="text-sm text-gray-400">Crypto</span>
          </div>
          <div className="grid gap-4">
            {predictions.map((prediction) => (
              <PredictionCard key={prediction.question} {...prediction} />
            ))}
          </div>
        </div>
      </section>

      <BetSlip />
    </main>
  );
}
