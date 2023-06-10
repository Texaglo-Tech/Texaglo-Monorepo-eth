import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import styles from "../../styles/page/solnaming.page.module.scss";
import axios from "axios";
import {
  treaseryWallet,
  API,
  SOL,
  TEXAGLO,
  dev,
  devnetRPC,
  mainnetRPC,
} from "./../../config";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header_BIZ from "../../component/headers/header";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { mintNFT, getSubDomain, getAllNFTs, getAllNFTsNew } from "./../../api";

import { Connection, PublicKey } from "@solana/web3.js";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import NftSection from "../../component/nftSection/nftSection";

toast.configure();

var connection: any;

if (dev) {
  connection = new Connection(devnetRPC, {
    commitment: "confirmed",
    confirmTransactionInitialTimeout: 120000,
  });
} else {
  connection = new Connection(mainnetRPC, {
    commitment: "confirmed",
    confirmTransactionInitialTimeout: 120000,
  });
}

const AppPage: NextPage = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [open, setOpen] = React.useState(false);
  const [subdomains, setSubdomains] = useState([]);
  const [subdomainsBackup, setSubdomainsBackup] = useState([]);
  const [gateLinks, setGateLinks] = useState([]);
  const [count, setCount] = useState("10");
  const [nftExist, setNftExist] = useState(false);
  const [nftCount, setNftCount] = useState(0);

  const router = useRouter();

  const fetchWalletForNFTs = async (address: string) => {
    const wallet = new PublicKey(address);
    const nftAccounts = await getParsedNftAccountsByOwner({
      publicAddress: address,
      connection: connection,
    });
    console.log(`\n${nftAccounts.length} nfts determined from this wallet`);
    return nftAccounts;
  };

  const searchMyDomainHandle = async (e: any) => {
    try {
      const searchKey = e.target.value;
      setSubdomains(
        subdomainsBackup.filter((item) => {
          if (item) {
            if (
              item.data.name.toLowerCase().includes(searchKey.toLowerCase())
            ) {
              return item;
            }
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const checkNFT = async (data) => {
    try {
      if(data.length <= 0){
        router.push("/Memberships");
        toast.info(`You need to be a member!`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.error("NFT Checking Error!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      console.log(err);
    }
  };

  const goToRegisterPage = () => {
    router.push("https://daofolk.texaglo.com");
    
  };

  const goToSearchPage = () => {
    router.push("/sdns/search");
  };

  useEffect(() => {
    if (wallet?.publicKey) {
      getAllNFTsNew(wallet?.publicKey.toBase58())
        .then((data) => {
          checkNFT(data);
          setSubdomains(data);
          setSubdomainsBackup(data);
          console.log(data);
        })
        .catch((err) => {});
    }
  }, [wallet]);

  return (
    <div className={styles.main}>
      <Header_BIZ />
      <div className={styles.main_body}>
        <input
          className={styles.customItem}
          placeholder="Search your Dao accounts"
          onChange={searchMyDomainHandle}
        />
        <p className={styles.subIntro}>
          Signup to Join the DAO and start sharing your Web3 Journey. 
        </p>
        <Grid container spacing={3}>
          <Grid xs={12} md={4} item></Grid>
          <Grid xs={12} md={2} item>
            <button
              className={styles.btn_standard}
              onClick={() => goToRegisterPage()}
            >
              {" "}
              Join{" "}
            </button>
          </Grid>
          <Grid xs={12} md={2} item>
            <button
              className={styles.searchButton}
              onClick={() => goToSearchPage()}
            >
              {" "}
              Dao Members
            </button>
          </Grid>
          <Grid xs={12} md={4} item></Grid>
        </Grid>
        <p className={styles.registerDomain}>Dao Tokens</p>
        <div className={styles.subdomain_box}>
          <NftSection/>
          {/* {subdomains.map((item, index) => (
            <div key={index} className={styles.subdomainButtonDiv}>
              <span className={styles.itemNumber}>
                {item?.name.toUpperCase()}
              </span>
              <button
                className={styles.btn_classic}
                onClick={() => {
                  router.push(`/sdns/createGate?subdomain=${item.name}`);
                }}
              >
                EDIT
              </button>
              <button
                className={styles.btn_classic}
                onClick={() => {
                  window.open(`https://${item.name}.texaglo.com`, "_blank");
                }}
              >
                Preview
              </button>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default AppPage;
