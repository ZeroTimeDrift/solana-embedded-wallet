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
import { clusterApiUrl, PublicKey, Keypair } from '@solana/web3.js';
import { initialize } from '../wallet/initalize';
import { GhostWallet } from '../wallet/wallet';
import { Ghost } from '../wallet/window';
import { GhostImplementation } from '../wallet/new-wallet';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

function MyApp({ Component, pageProps }) {
    const [isWalletReady, setWalletReady] = useState(false);
 
    useEffect(() => {
        // write to local storage
        localStorage.setItem('walletName', '"MoonGate"'); // This connects the wallet before the page loads
        const ghost = new GhostImplementation();
        console.log(ghost);
        const ghostWallet = new GhostWallet(ghost);
        console.log(ghostWallet);
        initialize(ghost);
    
        try {
          Object.defineProperty(window, 'moongate', { value: ghostWallet });
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
          <WalletProvider wallets={wallets} autoConnect={true}>
              <WalletModalProvider>
                  <Component {...pageProps} />
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
}

export default MyApp
