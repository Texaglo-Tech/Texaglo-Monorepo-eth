import React, { useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useRouter } from "next/router";
import WalletContext from "../context/WalletContext";
import Grid from "@mui/material/Grid";
import ConnectOnPcToUseButton from "../component/ConnectOnPcToUseButton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

const FeaturedProjects = ({ Component, pageProps }: any) => {
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
  const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
        slidesToSlide: 2// optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
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
        router.push("/home");
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
        setWallet.setAddress(response.publicKey.toString());;
        router.push("/split");
      } catch (err) {}
    }
  };
  const connectWallet2 = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      try {
        const response = await solana.connect();
        setWalletKey(response.publicKey.toString());
        setWallet.setAddress(response.publicKey.toString());
        router.push("/sdns");
      } catch (err) {}
    }
  };
  const connectWallet3 = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      try {
        const response = await solana.connect();
        setWalletKey(response.publicKey.toString());
        setWallet.setAddress(response.publicKey.toString());
        router.push("/");
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
    <section id="tool">
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <div className="row">
              <div className="col col-12">
                <p
                  className="col-12 col-md-6 col-lg-4"
                  style={{
                    textAlign: "left",
                    color: "var(--bs-gray-dark)",
                    marginTop: "38px",
                    marginBottom: "0px",
                    fontWeight: "bold",
                    fontSize: "13px",
                    lineHeight: "16.5px",
                  }}
                >
                  WEB3
                </p>
                <p
                  className="col-12 col-md-6 col-lg-4"
                  style={{
                    textAlign: "left",
                    color: "var(--bs-gray-dark)",
                    marginTop: "0px",
                    marginBottom: "20px",
                    fontSize: "20px",
                    lineHeight: "28px",
                    fontWeight: "bold",
                  }}
                >
                  FEATURES
                </p>
              </div>
            </div>
           
                
            <div className="row">
            <Carousel  swipeable={true}
  draggable={true}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  //autoPlay={this.props.deviceType !== "mobile" ? true : false}
  autoPlaySpeed={1}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={1}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  //deviceType={this.props.deviceType}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-20-px">
                    
              <div
                className="col col-12 col-lg-11 d-inline-block"
                style={{
                  background:
                    'url("/img/1c_Ecer_Background-18.jpg") right / auto no-repeat',
                  marginTop: "0px",
                  textAlign: "center",
                  paddingBottom: "58px",
                  marginRight: "0px",
                  marginLeft: "0px",
                }}
              >
                <p
                  className="col-12 col-md-6 mx-auto"
                  style={{
                    textAlign: "center",
                    color: "rgb(255, 255, 255)",
                    marginTop: "57px",
                    marginBottom: "35px",
                    fontWeight: "bold",
                    fontSize: "23px",
                  }}
                >
                  AUTOMATIC NFT ASSEMBLY
                </p>
                <p
                  className="col-12 col-md-6 col-lg-8 mx-auto"
                  style={{
                    textAlign: "center",
                    color: "rgb(255, 255, 255)",
                    marginTop: "38px",
                    marginBottom: "56px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                >
                  Do you have the pieces to an NFT? Did you know you could
                  assemble them on your own? No coding or web development
                  experience needed. Just click the button below and follow
                  through to have your very own set of money making NFT’s.
                  <br />
                </p>
                <button
                  onClick={() => connectWallet()}
                  className="btn btn-primary show_on_desktop"
                  type="button"
                  style={{
                    textAlign: "center",
                    background: "#ffffff",
                    color: "#0241ff",
                    fontWeight: "bold",
                    borderStyle: "none",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    paddingRight: "14px",
                    paddingLeft: "14px",
                  }}
                >
                  USE OUR NFT BUILDER
                </button>
                <ConnectOnPcToUseButton />
              </div>
              <div
                className="col col-12 col-lg-11 d-inline-block"
                style={{
                  background:
                    'url("/img/1a_Ecer_Background-17.jpg") right / auto no-repeat',
                  marginTop: "0px",
                  textAlign: "center",
                  paddingBottom: "58px",
                  marginRight: "0px",
                  marginLeft: "0px",
                }}
              >
                <p
                  className="col-12 col-md-6 mx-auto"
                  style={{
                    textAlign: "center",
                    color: "rgb(255, 255, 255)",
                    marginTop: "57px",
                    marginBottom: "35px",
                    fontWeight: "bold",
                    fontSize: "23px",
                  }}
                >
                 PAYMENT SPLITTER BLOCKCHAIN TOOL
                </p>
                <p
                  className="col-12 col-md-6 col-lg-8 mx-auto"
                  style={{
                    textAlign: "center",
                    color: "rgb(255, 255, 255)",
                    marginTop: "38px",
                    marginBottom: "56px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                >
                 Do you have a group of people who need to split a payment, but don't want to go through the hassle of manually calculating and distributing the funds? Look no further, because the Payment Splitter Web3 application has got you covered.
                  <br />
                </p>
                <button
                  onClick={() => connectWallet1()}
                  className="btn btn-primary show_on_desktop"
                  type="button"
                  style={{
                    textAlign: "center",
                    background: "#ffffff",
                    color: "#0241ff",
                    fontWeight: "bold",
                    borderStyle: "none",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    paddingRight: "14px",
                    paddingLeft: "14px",
                  }}
                >
                 Use our Splitter tool
                </button>
                <ConnectOnPcToUseButton />
              </div>
              <div
                className="col col-12 col-lg-11 d-inline-block"
                style={{
                  background:
                    'url("/img/1c_Ecer_Background-18.jpg") right / auto no-repeat',
                  marginTop: "0px",
                  textAlign: "center",
                  paddingBottom: "58px",
                  marginRight: "0px",
                  marginLeft: "0px",
                }}
              >
                <p
                  className="col-12 col-md-6 mx-auto"
                  style={{
                    textAlign: "center",
                    color: "rgb(255, 255, 255)",
                    marginTop: "57px",
                    marginBottom: "35px",
                    fontWeight: "bold",
                    fontSize: "23px",
                  }}
                >
                  SUBDOMAIN CREATION SERVICE
                </p>
                <p
                  className="col-12 col-md-6 col-lg-8 mx-auto"
                  style={{
                    textAlign: "center",
                    color: "rgb(255, 255, 255)",
                    marginTop: "38px",
                    marginBottom: "56px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                >
                  
With this convenient tool, you can easily set up a subdomain for your website in just a few clicks. No coding or web development experience is required – the Subdomain Creation Service does all the work for you.
                  <br />
                </p>
                <button
                  onClick={() => connectWallet2()}
                  className="btn btn-primary show_on_desktop"
                  type="button"
                  style={{
                    textAlign: "center",
                    background: "#ffffff",
                    color: "#0241ff",
                    fontWeight: "bold",
                    borderStyle: "none",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    paddingRight: "14px",
                    paddingLeft: "14px",
                  }}
                >
                  Subdomain Service
                </button>
                <ConnectOnPcToUseButton />
              </div>
              
           
              <div
                className="col col-12 col-lg-11 d-inline-block"
                style={{
                  background:
                    'url("/img/1a_Ecer_Background-17.jpg") right / auto no-repeat',
                  marginTop: "0px",
                  textAlign: "center",
                  paddingBottom: "58px",
                  marginRight: "0px",
                  marginLeft: "0px",
                }}
              >
                <p
                  className="col-12 col-md-6 mx-auto"
                  style={{
                    textAlign: "center",
                    color: "rgb(255, 255, 255)",
                    marginTop: "57px",
                    marginBottom: "35px",
                    fontWeight: "bold",
                    fontSize: "23px",
                  }}
                >
                  PRIVATE BLOCKCHAIN FUNDRAISING
                </p>
                <p
                  className="col-12 col-md-6 col-lg-8 mx-auto"
                  style={{
                    textAlign: "center",
                    color: "rgb(255, 255, 255)",
                    marginTop: "38px",
                    marginBottom: "56px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                >
                  The Fund web3 app is for fast and easy transfer of funds, making it convenient for both you and your donors. Our fund application also offers a range of customizable options, so you can tailor the fundraising process to fit your specific needs.
                  <br />
                </p>
                <button
                  
                  className="btn btn-primary show_on_desktop"
                  type="button"
                  style={{
                    textAlign: "center",
                    background: "#ffffff",
                    color: "#0241ff",
                    fontWeight: "bold",
                    borderStyle: "none",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    paddingRight: "14px",
                    paddingLeft: "14px",
                  }}
                >
                  Coming Soon
                </button>
                <ConnectOnPcToUseButton />
              </div>
             
              
              </Carousel>
            </div>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
