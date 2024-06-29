import { defineChain } from 'thirdweb';

export const bsc = defineChain({
  id: 97,
  name: 'BSC Testnet',
  nativeCurrency: { name: 'tBNB', symbol: 'tBNB', decimals: 18 },
  blockExplorers: [
    {
      name: 'Binance Smart Chain Explorer',
      url: 'https://explorer.binance.org/smart-testnet',
      apiUrl: 'https://data-seed-prebsc-2-s1.binance.org:8545',
    },
  ],
});

export const chain = bsc;
