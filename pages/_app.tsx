import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.css";
import { ProviderProps } from "../types";
import WalletProviders from "../context/WalletProvider";
import { ToastContainer } from "react-toastify";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {ConnectionProvider, useConnection, useWallet, WalletProvider} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import React, { useMemo } from 'react';
import {PhantomWalletAdapter, SolflareWalletAdapter, UnsafeBurnerWalletAdapter, GlowWalletAdapter, TorusWalletAdapter} from '@solana/wallet-adapter-wallets';
import {clusterApiUrl, PublicKey} from '@solana/web3.js';
import { treaseryWallet, API, SOL, dev, devnetRPC, mainnetRPC } from "./../config";
import type { FC } from 'react';
import { GatewayProvider, useGateway, GatewayStatus } from '@civic/solana-gateway-react';
import "react-toastify/dist/ReactToastify.css";

const Providers = (props: ProviderProps) => {
  return <WalletProviders>{props.children}</WalletProviders>;
};

let endpoint: any;
const network:any = "devnet";


function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  
  if(dev){
    endpoint = devnetRPC//"https://api.devnet.solana.com" //devnetRPC
  }else{
    endpoint = mainnetRPC
  }

  // console.clear()
  // console.log = () => { };

  const wallets = useMemo(
      () => [
          new PhantomWalletAdapter(),
          new GlowWalletAdapter(),
          new TorusWalletAdapter(),
      ],
      [network]
  );
    
  return (
    <Providers {...pageProps}>
       <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                  <div>
                      <ToastContainer />
                      <AnyComponent {...pageProps} />
                  </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    </Providers>
  );
}

export default MyApp;
