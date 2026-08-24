import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { celo } from "viem/chains";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { celoSepolia } from "../lib/chains";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [celoSepolia, celo],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http:
          chain.id === celo.id
            ? "https://forno.celo.org"
            : "https://forno.celo-sepolia.celo-testnet.org",
      }),
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Smart Word",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "smartword-dev-placeholder",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
