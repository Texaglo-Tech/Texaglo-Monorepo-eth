import React from "react";
import navbarItems from "../NavbarItems";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { getAccount } from "@wagmi/core";

import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";

import { requestAirdrop } from "./../../api";

require("@solana/wallet-adapter-react-ui/styles.css");

const Navbar = ({ toggle }) => {
  const account = getAccount();
  console.log(account.address);

  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

  const handleAirdrop = async () => {
    const id = toast.loading("Getting faucet...", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    const res = await requestAirdrop(connection, wallet);
    if (res == "success") {
      toast.update(id, {
        render: "You got the 0.2 SOL Successfully!",
        type: "success",
        autoClose: 2000,
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: "You got error, please try again!",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
    }
  };
  return (
    <nav>
      <div className="icons">
        <button type="button" class="large-border" onClick={handleAirdrop}>
          Get Faucet
        </button>
        <Web3Button
          icon="show"
          label="Connect Wallet"
          balance="show"
          className="large-border"
        />
        <div className="mobile-menu-icon">
          <FaBars onClick={toggle} />
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
