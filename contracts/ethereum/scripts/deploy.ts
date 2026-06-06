import { ethers } from "hardhat";

async function main() {
  console.log("Deploying Smart Contracts to Sepolia Testnet...");

  // Deploy GoBet Escrow
  const GoBetEscrow = await ethers.getContractFactory("GoBetEscrow");
  const goBetEscrow = await GoBetEscrow.deploy();
  await goBetEscrow.waitForDeployment();
  console.log(`GoBetEscrow deployed to: ${await goBetEscrow.getAddress()}`);

  // Deploy Prediction Market
  const PredictionMarket = await ethers.getContractFactory("PredictionMarket");
  const predictionMarket = await PredictionMarket.deploy();
  await predictionMarket.waitForDeployment();
  console.log(`PredictionMarket deployed to: ${await predictionMarket.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
