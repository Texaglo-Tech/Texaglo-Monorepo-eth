import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  getAccount,
  fetchTransaction,
  readContract,
  watchPendingTransactions,
} from "@wagmi/core";
import { ethers, BigNumber } from "ethers";
import NftAbi from "../contracts/Daofork.sol/Daofork.json";

import backgrounds from "./../imgPath/backgrounds";
import halos from "./../imgPath/Halos";
import clothingMale from "./../imgPath/Cloth/Clothing_Male";
import clothingFemale from "./../imgPath/Cloth/Clothing_Female";
import maleFacePaints from "./../imgPath/Face_Paint/Face_Paint_Male";
import femaleFacePaints from "./../imgPath/Face_Paint/Face_Paint_Female";

// ============= Character Name===========
import Female_Character_Name from "./../imgPath/Female_Character_Name";
import Male_Character_Name from "./../imgPath/Male_Character_Name";

// ============= Aliyah Import===========
import Body_Aliyah from "./../imgPath/Aliyah/Body_Aliyah";
import Hair_Aliyah from "./../imgPath/Aliyah/Hair_Aliyah";
import Hands_Aliyah from "./../imgPath/Aliyah/Hands_Aliyah";
// ============= Arjun Import============
import Body_Arjun from "./../imgPath/Arjun/Body_Arjun";
import Hair_Arjun from "./../imgPath/Arjun/Hair_Arjun";
import Hands_Arjun from "./../imgPath/Arjun/Hands_Arjun";
// ============= Arthur Import===========
import Body_Arthur from "./../imgPath/Arthur/Body_Arthur";
import Hair_Arthur from "./../imgPath/Arthur/Hair_Arthur";
import Hands_Arthur from "./../imgPath/Arthur/Hands_Arthur";
// ============= Brick Import============
import Body_Brick from "./../imgPath/Brick/Body_Brick";
import Hair_Brick from "./../imgPath/Brick/Hair_Brick";
import Hands_Brick from "./../imgPath/Brick/Hands_Brick";
// ============= Cato Import=============
import Body_Cato from "./../imgPath/Cato/Body_Cato";
import Hair_Cato from "./../imgPath/Cato/Hair_Cato";
import Hands_Cato from "./../imgPath/Cato/Hands_Cato";
// ============= Kitri Import============
import Body_Kitri from "./../imgPath/Kitri/Body_Kitri";
import Hair_Kitri from "./../imgPath/Kitri/Hair_Kitri";
import Hands_Kitri from "./../imgPath/Kitri/Hands_Kitri";
// ============= Luna Import=============
import Body_Luna from "./../imgPath/Luna/Body_Luna";
import Hair_Luna from "./../imgPath/Luna/Hair_Luna";
import Hands_Luna from "./../imgPath/Luna/Hands_Luna";
// ============= Madhura Import==========
import Body_Madhura from "./../imgPath/Madhura/Body_Madhura";
import Hair_Madhura from "./../imgPath/Madhura/Hair_Madhura";
import Hands_Madhura from "./../imgPath/Madhura/Hands_Madhura";
// ============= Mara Import=============
import Body_Mara from "./../imgPath/Mara/Body_Mara";
import Hair_Mara from "./../imgPath/Mara/Hair_Mara";
import Hands_Mara from "./../imgPath/Mara/Hands_Mara";
// ============= Musashi Import==========
import Body_Musashi from "./../imgPath/Musashi/Body_Musashi";
import Hair_Musashi from "./../imgPath/Musashi/Hair_Musashi";
import Hands_Musashi from "./../imgPath/Musashi/Hands_Musashi";
// ============= Rose Import=============
import Body_Rose from "./../imgPath/Rose/Body_Rose";
import Hair_Rose from "./../imgPath/Rose/Hair_Rose";
import Hands_Rose from "./../imgPath/Rose/Hands_Rose";
// ============= Shiro Import============
import Body_Shiro from "./../imgPath/Shiro/Body_Shiro";
import Hair_Shiro from "./../imgPath/Shiro/Hair_Shiro";
import Hands_Shiro from "./../imgPath/Shiro/Hands_Shiro";
// ============= Sten Import========
import Body_Sten from "./../imgPath/Sten/Body_Sten";
import Hair_Sten from "./../imgPath/Sten/Hair_Sten";
import Hands_Sten from "./../imgPath/Sten/Hands_Sten";
// ============= Yuki Import=============
import Body_Yuki from "./../imgPath/Yuki/Body_Yuki";
import Hair_Yuki from "./../imgPath/Yuki/Hair_Yuki";
import Hands_Yuki from "./../imgPath/Yuki/Hands_Yuki";

import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";

import { mintCollection, mintNFTCollection } from "./../api";

const URL = "{your_Texaglo_api}";
const API = "{your_Texaglo_api}";

const collectionAuthorityRecord =
  "collection authority";
const collectionMint = "mint address";
const collectionMetadata = "metadata address";
const collectionMasterEdition = "master edition address";
const collectionUpdateAuthority =
  "update authority address";

let selectedFemaleName = 0;
let selectedMaleName = 0;

const Random = ({ clicked, subdomain, email, leaseMonth, pageHandle }) => {
  const account = getAccount();

  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

  let selectedGender = "female";

  const [gender, setGender] = useState(selectedGender);

  const [femaleName, SetFemaleName] = useState(0);
  const [maleName, SetMaleName] = useState(0);

  const [femaleBody, setFemaleBody] = useState(0);
  const [fCloch, setfCloch] = useState(0);
  const [fHairs, setfHairs] = useState(0);
  const [fFacePaint, SetFFacePaint] = useState(0);

  const [mHairs, setmHairs] = useState(0);
  const [maleCloth, setMaleCloth] = useState(0);
  const [mFacePaint, SetMFacePaint] = useState(0);
  const [maleBody, setMaleBody] = useState(0);

  const [halo, setHalos] = useState(0);
  const [bg, setBg] = useState(0);

  // ======Female variable=============
  let femaleHair;
  let felmaleHands;
  let femaleBodyName;

  const { fCharacterName } = Female_Character_Name[selectedFemaleName];
  console.log(fCharacterName);

  if (fCharacterName === "Aliyah") {
    femaleHair = Hair_Aliyah;
    felmaleHands = Hands_Aliyah;
    femaleBodyName = Body_Aliyah;
  } else if (fCharacterName === "Kitri") {
    femaleHair = Hair_Kitri;
    felmaleHands = Hands_Kitri;
    femaleBodyName = Body_Kitri;
  } else if (fCharacterName === "Luna") {
    femaleHair = Hair_Luna;
    felmaleHands = Hands_Luna;
    femaleBodyName = Body_Luna;
  } else if (fCharacterName === "Madhura") {
    femaleHair = Hair_Madhura;
    felmaleHands = Hands_Madhura;
    femaleBodyName = Body_Madhura;
  } else if (fCharacterName === "Mara") {
    femaleHair = Hair_Mara;
    felmaleHands = Hands_Mara;
    femaleBodyName = Body_Mara;
  } else if (fCharacterName === "Rose") {
    femaleHair = Hair_Rose;
    felmaleHands = Hands_Rose;
    femaleBodyName = Body_Rose;
  } else if (fCharacterName === "Yuki") {
    femaleHair = Hair_Yuki;
    felmaleHands = Hands_Yuki;
    femaleBodyName = Body_Yuki;
  }

  // ======Male variable=============
  let maleHair;
  let maleHands;
  let maleBodyName;

  const { mCharacterName } = Male_Character_Name[selectedMaleName];
  console.log(mCharacterName);

  if (mCharacterName === "Arjun") {
    maleHair = Hair_Arjun;
    maleHands = Hands_Arjun;
    maleBodyName = Body_Arjun;
  } else if (mCharacterName === "Arthur") {
    maleHair = Hair_Arthur;
    maleHands = Hands_Arthur;
    maleBodyName = Body_Arthur;
  } else if (mCharacterName === "Brick") {
    maleHair = Hair_Brick;
    maleHands = Hands_Brick;
    maleBodyName = Body_Brick;
  } else if (mCharacterName === "Cato") {
    maleHair = Hair_Cato;
    maleHands = Hands_Cato;
    maleBodyName = Body_Cato;
  } else if (mCharacterName === "Musashi") {
    maleHair = Hair_Musashi;
    maleHands = Hands_Musashi;
    maleBodyName = Body_Musashi;
  } else if (mCharacterName === "Shiro") {
    maleHair = Hair_Shiro;
    maleHands = Hands_Shiro;
    maleBodyName = Body_Shiro;
  } else if (mCharacterName === "Sten") {
    maleHair = Hair_Sten;
    maleHands = Hands_Sten;
    maleBodyName = Body_Sten;
  }

  const { fBody, fBody_path } = femaleBodyName[femaleBody];
  const { fHair, fHairPath } = femaleHair[fHairs];
  // const { fHandstId, fHands } = felmaleHands[fHairs];
  const { fClochImg, fCloch_path } = clothingFemale[fCloch];
  const { fFacePaintImg, fFacePaint_path } = femaleFacePaints[fFacePaint];

  // ======Male variable=============
  const { mBody, mBody_path } = maleBodyName[maleBody];
  const { mHair, mHairPath } = maleHair[mHairs];
  // const { mHandstId, mHands } = maleHands[mHairs];
  const { mClochImg, mCloch_path } = clothingMale[maleCloth];
  const { mFacePaintImg, mFacePaint_path } = maleFacePaints[mFacePaint];

  // ======Common variable=============
  const { background, bgPath } = backgrounds[bg];
  const { halosImg, halos_path } = halos[halo];

  //Female random function Startting from here
  const RanGender = () => {
    let ran = Math.floor(Math.random() * 2);
    if (ran === 0) {
      setGender("female");
      return "female";
    } else {
      setGender("male");
      return "male";
    }
    // console.log(` ${RanGender()}`);
  };

  const Ranhalos = () => {
    let ran = Math.floor(Math.random() * halos.length);
    setHalos(ran);
  };

  const RanFName = () => {
    let ran = Math.floor(Math.random() * Female_Character_Name.length);
    SetFemaleName(ran);
    selectedFemaleName = ran;
    return ran;
  };
  const RanFBody = () => {
    let ran = Math.floor(Math.random() * femaleBodyName.length);
    setFemaleBody(ran);
    console.log(`RanFBody random number ${ran}`);
  };
  const RanFCloth = () => {
    let ran = Math.floor(Math.random() * clothingFemale.length);
    setfCloch(ran);
    console.log(`RanFCloth random number ${ran}`);
  };
  const RanFHair = () => {
    let ran = Math.floor(Math.random() * femaleHair.length);
    setfHairs(ran);
    console.log(`RanFHair random number ${ran}`);
  };
  const RanFFacePaint = () => {
    let ran = Math.floor(Math.random() * femaleFacePaints.length);
    SetFFacePaint(ran);
    console.log(`RanFFacePaint random number ${ran}`);
  };

  //Male random function Startting from here
  const RanMName = () => {
    let ran = Math.floor(Math.random() * Male_Character_Name.length);
    selectedMaleName = ran;
    SetMaleName(ran);
    return ran;
  };
  const RanMBody = () => {
    let ran = Math.floor(Math.random() * maleBodyName.length);
    SetMaleName(ran);
    console.log(`RanMBody random number ${ran}`);
  };

  const RanMCloth = () => {
    let ran = Math.floor(Math.random() * clothingMale.length);
    setMaleCloth(ran);
    console.log(`RanMCloth random number ${ran}`);
  };
  const RanMHair = () => {
    let ran = Math.floor(Math.random() * maleHair.length);
    setmHairs(ran);
    console.log(`RanMHair random number ${ran}`);
  };
  const RanMFacePaint = () => {
    let ran = Math.floor(Math.random() * maleFacePaints.length);
    SetMFacePaint(ran);
    console.log(`RanMFacePaint random number ${ran}`);
  };

  const mintRandomHandle = async () => {
    if (!account.address) {
      toast.info("Please connect the wallet!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    if (gender === "female") {
      try {
        if (bgPath == "") {
          toast.info("Please set the background!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          return;
        }
        if (halos_path == "") {
          toast.info("Please set the halo!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          return;
        }
        if (fBody_path == "") {
          toast.info("Please set the body!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          return;
        }
        if (fHairPath == "") {
          toast.info("Please set the hair!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          return;
        }
        const _id = toast.loading("NFT uploading.....", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });

        const result = await axios
          .post(`${URL}/customize`, {
            wallet: account.address,
            background: bgPath,
            halos: halos_path,
            body: fBody_path,
            hair: fHairPath,
            face_Paint: fFacePaint_path,
            cloch: fCloch_path,
          })
          .then(async (res) => {
            if (res.data.Response_message === "success") {
              toast.update(_id, {
                render: "NFT upload successfully!",
                type: "success",
                autoClose: 2000,
                isLoading: false,
              });
              console.log(res.data.Response_data.Location);
              const id = toast.loading("NFT minting...", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
              });

              /*const [
                  resData,
                  tx,
                  collectionAuthorityRecord,
                  collectionMint,
                  collectionMetadata,
                  collectionMasterEdition,
                  collectionUpdateAuthority,
                ] = await mintCollection(
                  "DAO " + (Math.random() * 1000000).toFixed(0),
                  connection,
                  wallet,
                  1,
                  1,
                  res.data.Response_data.Location
                );*/
              const uri = {
                name: subdomain,
                uri: res.data.Response_data.Location,
              };
              // const [resData, tx, mint] = await mintNFTCollection(
              //   collectionAuthorityRecord,
              //   collectionMint,
              //   collectionMetadata,
              //   collectionMasterEdition,
              //   collectionUpdateAuthority,
              //   uri,
              //   subdomain,
              //   1,
              //   connection,
              //   wallet,
              //   0.1
              // );

              // Mint from here..............
              let txData = null;
              const provider = new ethers.providers.Web3Provider(
                window.ethereum
              );

              await provider.send("eth_requestAccounts", []);

              const signer = provider.getSigner();
              console.log(signer);
              const contract = new ethers.Contract(
                "0x282a08498118911Ee2353634824D5784d5679a74",
                NftAbi.abi,
                signer
              );
              console.log(
                BigNumber.from(res.data.Response_data.key.replace(".json", ""))
              );
              try {
                const response = await contract.mint(
                  account.address,
                  BigNumber.from(
                    res.data.Response_data.key.replace(".json", "")
                  ),
                  {
                    value: ethers.utils.parseEther((0.0 * 1).toString()),
                  }
                );
                txData = response;
                console.log("Transaction confirmed!");
              } catch (err) {
                console.log("error: ", err);
              }

              const Status = await axios.get(
                `{your_Texaglo_api}api
              ?module=transaction
              &action=gettxreceiptstatus
              &txhash=${txData.hash}
              &apikey=apikey`
              );

              console.log("success: ", Status);
              console.log("response: ", txData.hash);
              console.log("response: ", txData.from);
              const nftBlance = await readContract({
                address: "0x282a08498118911Ee2353634824D5784d5679a74",
                abi: NftAbi.abi,
                functionName: "balanceOf",
                args: [account.address],
              });

              if (nftBlance > 0) {
                toast.update(id, {
                  render: "Minted Successfully!",
                  type: "success",
                  autoClose: 2000,
                  isLoading: false,
                });
                const __id = toast.loading("Creating Dao Account.....", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 3000,
                });
                const data = {
                  wallet: account.address,
                  mintAddress: txData.from,
                  month: leaseMonth,
                  subDomain: subdomain,
                  email: email,
                  transaction: txData.hash,
                };
                try {
                  const res = await axios.post(
                    `${API}/api/subdomain/create-subdomain`,
                    data
                  );
                  if (res.data.status == "success") {
                    toast.update(__id, {
                      render: "Created subdomain successfully!",
                      type: "success",
                      autoClose: 2000,
                      isLoading: false,
                    });
                  } else if (res.data.status == "error") {
                    toast.update(__id, {
                      render: "Got Error!!",
                      type: "info",
                      autoClose: 2000,
                      isLoading: false,
                    });
                  } else {
                    toast.update(__id, {
                      render: res.data.status,
                      type: "info",
                      autoClose: 2000,
                      isLoading: false,
                    });
                  }
                } catch (err) {
                  console.log(err);
                  toast.update(__id, {
                    render: "Got Error!",
                    type: "error",
                    autoClose: 2000,
                    isLoading: false,
                  });
                }
              } else {
                toast.update(id, {
                  render: "Got Error!",
                  type: "info",
                  autoClose: 2000,
                  isLoading: false,
                });
              }
            } else {
              toast.update(_id, {
                render: "Got Error!",
                type: "info",
                autoClose: 2000,
                isLoading: false,
              });
              console.log("posting dta", res);
            }
          })
          .catch((err) => {
            toast.update(_id, {
              render: "Got Error!",
              type: "info",
              autoClose: 2000,
              isLoading: false,
            });
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("hi");
      if (bgPath == "") {
        toast.info("Please set the background!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        return;
      }
      if (halos_path == "") {
        toast.info("Please set the halo!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        return;
      }
      if (mBody_path == "") {
        toast.info("Please set the body!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        return;
      }
      if (mHairPath == "") {
        toast.info("Please set the hair!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        return;
      }

      const _id = toast.loading("NFT uploading.....", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });

      const result = await axios
        .post(`${URL}/customize`, {
          wallet: account.address,
          background: bgPath,
          halos: halos_path,
          body: mBody_path,
          hair: mHairPath,
          face_Paint: mFacePaint_path,
          cloch: mCloch_path,
        })
        .then(async (res) => {
          if (res.data.Response_message === "success") {
            toast.update(_id, {
              render: "NFT upload successfully!",
              type: "success",
              autoClose: 2000,
              isLoading: false,
            });
            console.log(res.data.Response_data.Location);
            const id = toast.loading("NFT minting...", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
            });

            /*const [
              resData,
              tx,
              collectionAuthorityRecord,
              collectionMint,
              collectionMetadata,
              collectionMasterEdition,
              collectionUpdateAuthority,
            ] = await mintCollection(
              "DAO " + (Math.random() * 1000000).toFixed(0),
              connection,
              wallet,
              1,
              1,
              res.data.Response_data.Location
            );*/
            const uri = {
              name: subdomain,
              uri: res.data.Response_data.Location,
            };
            // const [resData, tx, mint] = await mintNFTCollection(
            //       collectionAuthorityRecord,
            //       collectionMint,
            //       collectionMetadata,
            //       collectionMasterEdition,
            //       collectionUpdateAuthority,
            //       uri,
            //       subdomain,
            //       1,
            //       connection,
            //       wallet,
            //       0.1
            //     );

            // Mint from here..............
            let txData = null;
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            await provider.send("eth_requestAccounts", []);

            const signer = provider.getSigner();
            console.log(signer);
            const contract = new ethers.Contract(
              "0x282a08498118911Ee2353634824D5784d5679a74",
              NftAbi.abi,
              signer
            );
            console.log(
              BigNumber.from(res.data.Response_data.key.replace(".json", ""))
            );
            try {
              const response = await contract.mint(
                account.address,
                BigNumber.from(res.data.Response_data.key.replace(".json", "")),
                {
                  value: ethers.utils.parseEther((0.0 * 1).toString()),
                }
              );
              txData = response;
              console.log("Transaction confirmed!");
            } catch (err) {
              console.log("error: ", err);
            }

            const Status = await axios.get(
              `https://api-testnet.polygonscan.com/api
           ?module=transaction
           &action=gettxreceiptstatus
           &txhash=${txData.hash}
           &key=JI9D56ZVDXI6S22HUYDHTSDIFR2R8QGMAM`
            );

            console.log("success: ", Status);
            console.log("response: ", txData.hash);
            console.log("response: ", txData.from);
            const nftBlance = await readContract({
              address: "0x282a08498118911Ee2353634824D5784d5679a74",
              abi: NftAbi.abi,
              functionName: "balanceOf",
              args: [account.address],
            });

            if (nftBlance > 0) {
              toast.update(id, {
                render: "Minted Successfully!",
                type: "success",
                autoClose: 2000,
                isLoading: false,
              });

              const __id = toast.loading("Creating Dao Account.....", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
              });
              const data = {
                wallet: account.address,
                mintAddress: txData.from,
                month: leaseMonth,
                subDomain: subdomain,
                email: email,
                transaction: txData.hash,
              };
              try {
                const res = await axios.post(
                  `${API}/api/subdomain/create-subdomain`,
                  data
                );
                if (res.data.status == "success") {
                  toast.update(__id, {
                    render: "Created subdomain successfully!",
                    type: "success",
                    autoClose: 2000,
                    isLoading: false,
                  });
                } else if (res.data.status == "error") {
                  toast.update(__id, {
                    render: "Got Error!!",
                    type: "info",
                    autoClose: 2000,
                    isLoading: false,
                  });
                } else {
                  toast.update(__id, {
                    render: res.data.status,
                    type: "info",
                    autoClose: 2000,
                    isLoading: false,
                  });
                }
              } catch (err) {
                console.log(err);
                toast.update(__id, {
                  render: "Got Error!",
                  type: "error",
                  autoClose: 2000,
                  isLoading: false,
                });
              }
            } else {
              toast.update(id, {
                render: "Got Error!",
                type: "info",
                autoClose: 2000,
                isLoading: false,
              });
            }
          } else {
            console.log("posting dta", res);
            toast.update(_id, {
              render: "Got Error!",
              type: "info",
              autoClose: 2000,
              isLoading: false,
            });
          }
        })
        .catch((err) => {
          toast.update(_id, {
            render: "Got Error!",
            type: "info",
            autoClose: 2000,
            isLoading: false,
          });
          console.log(err);
        });
    }
    pageHandle();
  };

  // Background
  const Ranbackground = () => {
    let ran = Math.floor(Math.random() * backgrounds.length);
    setBg(ran);
  };

  const mintRandom = () => {
    selectedGender = RanGender();
    console.log(selectedGender);
    Ranbackground();
    Ranhalos();
    if (selectedGender === "female") {
      selectedFemaleName = RanFName();
      RanFBody();
      RanFCloth();
      RanFHair();
      RanFFacePaint();
    } else {
      selectedMaleName = RanMName();
      RanMBody();
      RanMCloth();
      RanMHair();
      RanMFacePaint();
    }
  };

  console.log(fBody_path);
  console.log(fHairPath);

  console.log(mBody_path);
  console.log(mHairPath);

  useEffect(() => {
    mintRandom();
  }, [clicked]);

  return (
    <>
      <div className="Home_nft_box_img">
        <div className="img-box">
          {gender === "female" ? (
            <div className="img-cus">
              {bg === 0 ? "" : <img src={background} alt="" />}
              {halo === 0 ? "" : <img src={halosImg} alt="Halos" />}

              <img src={fBody} alt="Body" />
              <img src={fFacePaintImg} alt="FacePaint" />
              <img src={fHair} alt="Hair" />
              <img src={fClochImg} alt="Cloch" />
            </div>
          ) : (
            <div className="img-cus">
              {bg === 0 ? "" : <img src={background} alt="" />}
              {halo === 0 ? "" : <img src={halosImg} alt="Halos" />}

              <img src={mBody} alt="Body" />
              <img src={mFacePaintImg} alt="FacePaint" />
              <img src={mHair} alt="Hair" />
              <img src={mClochImg} alt="Cloch" />
            </div>
          )}
        </div>
      </div>
      <div className="mint_option_btn">
        <button
          type="button"
          className="large-border"
          style={{ height: "50px", width: "40%", margin: "auto" }}
          onClick={mintRandomHandle}
        >
          Mint
        </button>
        <ToastContainer />
      </div>
    </>
  );
};

export default Random;
