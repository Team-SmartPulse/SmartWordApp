import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {  goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { celo, celoAlfajores } from 'viem/chains';
import {infuraProvider} from 'wagmi/providers/infura'
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    celoAlfajores,
    celo,
  ],
  [infuraProvider({ apiKey: '22ac6fb2115642d39311d9e2072bc13e'}),
  publicProvider()
]
);

const { connectors } = getDefaultWallets({
  appName: 'Smart Word App',
  projectId: 'YOUR_PROJECT_ID',
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
