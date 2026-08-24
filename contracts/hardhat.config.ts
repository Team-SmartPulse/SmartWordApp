import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const CELO_SEPOLIA_RPC =
  process.env.CELO_SEPOLIA_RPC ||
  "https://forno.celo-sepolia.celo-testnet.org";
const CELO_RPC = process.env.CELO_RPC || "https://forno.celo.org";

const accounts = PRIVATE_KEY ? [PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      evmVersion: "cancun",
    },
  },
  networks: {
    hardhat: {},
    celoSepolia: {
      url: CELO_SEPOLIA_RPC,
      accounts,
      chainId: 11142220,
    },
    celo: {
      url: CELO_RPC,
      accounts,
      chainId: 42220,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
