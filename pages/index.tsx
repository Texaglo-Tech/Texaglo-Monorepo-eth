import styles from "../styles/page/texaglo.module.scss";
import Footer from "../component/footers/footer2";
import React, { useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useRouter } from "next/router";
import WalletContext from "../context/WalletContext";
import APP_SELECCTOR from "../component/sections/hero";
import Banner from "../component/sections/banner";
import About from "../component/sections/about";
import Slider from "../component/sections/slider";
import Contact from "../component/sections/contact";
import Tools from "./app";
import CopyrightsFooter from "../component/copyrightsFooter";
import FeaturedProjects from "./app";
import AboutUsNew from "../component/sections/about-us-new";
import TelecommunicationsComingSoon from "../component/sections/telecommunications-coming-soon";
import App from "../eth-sandbox/App";

type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding,
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

const index = ({ Component, pageProps }: any) => {
  const router = useRouter();
  const setWallet = React.useContext(WalletContext);

  const [provider, setProvider] = useState<PhantomProvider | undefined>(
    undefined,
  );
  const [walletKey, setWalletKey] = useState<PhantomProvider | undefined>(
    undefined,
  );

  /**
   * @description gets Phantom provider, if it exists
   */
  const getProvider = (): PhantomProvider | undefined => {
    if ("solana" in window) {
      // @ts-ignore
      const provider = window.solana as any;
      if (provider.isPhantom) return provider as PhantomProvider;
    }
  };

  /**
   * @description prompts user to connect wallet if it exists
   */
  const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      try {
        const response = await solana.connect();
        setWalletKey(response.publicKey.toString());
        setWallet.setAddress(response.publicKey.toString());
        router.push("/split");
      } catch (err) {}
    }
  };
  const connectWallet1 = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      try {
        const response = await solana.connect();
        setWalletKey(response.publicKey.toString());
        setWallet.setAddress(response.publicKey.toString());
        router.push("/home");
      } catch (err) {}
    }
  };

  /**
   * @description disconnect Phantom wallet
   */
  const disconnectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (walletKey && solana) {
      await (solana as PhantomProvider).disconnect();
      setWalletKey(undefined);
    }
  };

  return (
    <div className={styles.main}>
      <APP_SELECCTOR />
      <App/>
      {/* <Banner /> 
      <FeaturedProjects />
      <Slider /> 
      <Tools /> 
      <About /> 
      <AboutUsNew />
      <Contact />
      <Footer />
      <TelecommunicationsComingSoon /> */}
      <CopyrightsFooter /> 
    </div>
  );
};

export default index;
