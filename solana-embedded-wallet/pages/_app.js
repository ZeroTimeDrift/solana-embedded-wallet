import '../styles/globals.css'
import React, { FC, useMemo, useEffect, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { initialize } from './../wallet/initalize.ts';
import { GhostWallet } from '../wallet/wallet';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

function MyApp({ Component, pageProps }) {
    const [isWalletReady, setWalletReady] = useState(false);

    useEffect(() => {
        const ghostWallet = new GhostWallet();
        initialize(ghostWallet);
    
        try {
          Object.defineProperty(window, 'ghostWallet', { value: ghostWallet });
          setWalletReady(true);  // Set the wallet as ready
        } catch (error) {
          console.error(error);
        }
      }, []);

  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
      () => [
          new UnsafeBurnerWalletAdapter(),
      ],
      [network]
  );

  // If wallet is not ready, return loading screen
  if (!isWalletReady) {
    return <div>Loading...</div>;
  }

  return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                  <Component {...pageProps} />
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
}

export default MyApp
