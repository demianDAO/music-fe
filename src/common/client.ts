import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { createThirdwebClient } from 'thirdweb';
import { bscTestnet } from 'viem/chains';

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRD_WEB_CLIENT_ID,
});

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'a9c30d5eb9c7ff4a59c17172763ec48e',
  chains: [bscTestnet],
  ssr: false, // If your dApp uses server side rendering (SSR)
});
