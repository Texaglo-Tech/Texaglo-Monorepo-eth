import React from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import { ethers } from "ethers";
import { useState } from "react";
import { getProvider } from "../../eth-sandbox/utils";
import { useRouter } from "next/router";
import NftAbi from "../../contracts/Daofork.sol/Daofork.json";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

require("@solana/wallet-adapter-react-ui/styles.css");
toast.configure();

const Wallet_connect = ({ ShowWallectConnect }) => {
  const router = useRouter();
  // const [isNFT, setIsNFT] = useState(false);

  const solClick = () => {
    ShowWallectConnect(false);
  };

  const ethlClick = async () => {
    ShowWallectConnect(false);
    console.log("connecting...............!");
    try {
      const provider = getProvider();
      const accounts = await provider.send("eth_requestAccounts", []);
      const account = accounts[0];
      const contract = new ethers.Contract(
        "0x282a08498118911Ee2353634824D5784d5679a74",
        NftAbi.abi,
        provider
      );
      const nftBalance = await contract.balanceOf(account);
      console.log(`nft balance is ${Number(nftBalance)}`);

      if (nftBalance > 0) {
        router.push("/sdns");
      } else {
        router.push("/Memberships");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "rgb(45 29 113 / 73%)",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "1000",
      }}
    >
      <div
        style={{
          height: "50vh",
          width: "50%",
          background: "rgb(255 255 255 / 100%)",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "15px",
        }}
      >
        <button
          onClick={() => ShowWallectConnect(false)}
          style={{
            position: "absolute",
            top: "10%",
            left: "90%",
            transform: "translate(-50%, -50%)",
          }}
        >
          close
        </button>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onClick={ethlClick}
            style={{
              height: "45px",
              width: "160px",
              margin: "30px 0px",
            }}
          >
            Connect metamask
          </button>
          <WalletMultiButtonDynamic onClick={solClick} />
        </div>
      </div>
    </div>
  );
};

export default Wallet_connect;
