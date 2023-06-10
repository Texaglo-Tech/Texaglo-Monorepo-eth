import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import { useRouter } from "next/router";
import Image from "next/image";
import { getProvider } from "../../eth-sandbox/utils";
import NftAbi from "../../contracts/Daofork.sol/Daofork.json";

import Style from "./nftSection.module.css";

const NftSection = () => {
  const router = useRouter();
  const [tokenIds, setTokenIds] = useState([]);
  const [openReCus, setOpenReCus] = useState(false);
  const [reCusId, setReCusId] = useState();
  const [ethPrice, setEthPrice] = useState();

  const handleCreate = (id) => {
    setOpenReCus(true);
    setReCusId(id);
    router.push(`/sdns/createGate?subdomain=sifat`);
  };

  const getNftlist = async () => {
    let tokenList = [];

    const provider = getProvider();

    const accounts = await provider.send("eth_requestAccounts", []);
    const account = accounts[0];
    const contract = new ethers.Contract(
      "0x282a08498118911Ee2353634824D5784d5679a74",
      NftAbi.abi,
      provider
    );
    const nftBalance = await contract.balanceOf(account);

    for (let i = 0; i < nftBalance; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(account, i);
      tokenList.push(tokenId.toNumber());
    }

    setTokenIds(tokenList);
    console.log(`nft balance is ${Number(nftBalance)}`);
  };

  const getEthPrice = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const aggregatorV3InterfaceABI = [
      {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "description",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
        name: "getRoundData",
        outputs: [
          { internalType: "uint80", name: "roundId", type: "uint80" },
          { internalType: "int256", name: "answer", type: "int256" },
          { internalType: "uint256", name: "startedAt", type: "uint256" },
          { internalType: "uint256", name: "updatedAt", type: "uint256" },
          { internalType: "uint80", name: "answeredInRound", type: "uint80" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "latestRoundData",
        outputs: [
          { internalType: "uint80", name: "roundId", type: "uint80" },
          { internalType: "int256", name: "answer", type: "int256" },
          { internalType: "uint256", name: "startedAt", type: "uint256" },
          { internalType: "uint256", name: "updatedAt", type: "uint256" },
          { internalType: "uint80", name: "answeredInRound", type: "uint80" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "version",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ];
    const addr = "0x0715A7794a1dc8e42615F059dD6e406A6594651A";
    const priceFeed = new ethers.Contract(
      addr,
      aggregatorV3InterfaceABI,
      provider
    );
    priceFeed.latestRoundData().then((roundData) => {
      // Do something with roundData
      console.log("Latest Round Data", roundData);
      console.log("Latest Round Data", Number(roundData.answer));

      let number = Number(roundData.answer);
      let numberAsString = number.toString();
      let trimmedNumber = parseInt(numberAsString.substring(0, 4));

      const price = (1 / trimmedNumber) * 250;
      setEthPrice(price);
    });
  };

  console.log(tokenIds);

  useEffect(() => {
    getNftlist();
    getEthPrice();
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          padding: "30px",
          margin: "auto",
        }}
      >
        {tokenIds.map((nft, i) => (
          <div className={Style.nft}>
            <div className={Style.main}>
              <Image
                className="tokenImage"
                src={`https://daofolk.s3.amazonaws.com/${nft}.png`}
                alt="NFT"
                height={200}
                width={200}
              />
              <h2>Daofalk #{nft}</h2>
              <div className={Style.tokenInfo}>
                <div className={Style.price}>
                  <ins>◘</ins>
                  <p>{ethPrice} ETH</p>
                </div>
                {/* <div className={Style.duration}>
                  <ins>◷</ins>
                  <p>11 days left</p>
                </div> */}
              </div>

              <hr />
              <div className={Style.creator}>
                <button onClick={() => handleCreate(nft)}>
                  {" "}
                  <span className={Style.text}>Create</span>
                  <span className={Style.blob}></span>
                  <span className={Style.blob}></span>
                  <span className={Style.blob}></span>
                  <span className={Style.blob}></span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NftSection;
