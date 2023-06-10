import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { treaseryWallet, API, SOL, dev, devnetRPC, mainnetRPC } from "./../../../config";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@dialectlabs/react-ui/index.css';
import Header_BIZ from "../../../component/headers/header";

// import { CardinalTwitterIdentityResolver } from '@dialectlabs/identity-cardinal';
import { DialectDappsIdentityResolver } from '@dialectlabs/identity-dialect-dapps';
import { SNSIdentityResolver } from '@dialectlabs/identity-sns';

import {useConnection, useWallet} from '@solana/wallet-adapter-react';

import styles from "../../../styles/page/solnaming.search.page.module.scss";
import { mintNFT, getSubDomain, getAllNFTs, getAllSubDomain, getNFTOwner } from "./../../../api";
import { makeStyles } from "@mui/styles";

import {
        DialectSolanaSdk,
        DialectSolanaWalletAdapter,
        SolanaConfigProps,
    } from '@dialectlabs/react-sdk-blockchain-solana';

import {
    BottomChat,
    ChatNavigationHelpers,
    ConfigProps,
    defaultVariables,
    DialectNoBlockchainSdk,
    DialectThemeProvider,
    DialectUiManagementProvider,
    IncomingThemeVariables,
    useDialectUiId,
    } from '@dialectlabs/react-ui';
import { CivicIdentityResolver } from '@dialectlabs/identity-civic';

toast.configure();

export const themeVariables: IncomingThemeVariables = {
    dark: {
      bellButton:
        'w-12 h-12 shadow-xl shadow-neutral-800 border border-neutral-600 hover:shadow-neutral-700',
      slider:
        'sm:rounded-t-3xl shadow-xl shadow-neutral-900 sm:border-t sm:border-l sm:border-r border-neutral-800',
    },
    light: {
      bellButton:
        'w-12 h-12 shadow-md hover:shadow-lg shadow-neutral-300 hover:shadow-neutral-400 text-teal',
      slider:
        'sm:border-t sm:border-l sm:border-r border-border-light shadow-lg shadow-neutral-300 sm:rounded-t-3xl',
      colors: {
        textPrimary: 'text-dark',
      },
      button: `${defaultVariables.light.button} border-none bg-pink`,
      highlighted: `${defaultVariables.light.highlighted} bg-light border border-border-light`,
      input: `${defaultVariables.light.input} border-b-teal focus:ring-teal text-teal`,
      iconButton: `${defaultVariables.light.iconButton} hover:text-teal hover:opacity-100`,
      avatar: `${defaultVariables.light.avatar} bg-light`,
      messageBubble: `${defaultVariables.light.messageBubble} border-none bg-blue text-black`,
      sendButton: `${defaultVariables.light.sendButton} bg-teal`,
    },
};


const useStyles = makeStyles({
    mainImage: (props: any) => ({ backgroundImage: `url(${props.mainImage}) !important` }),
  });

const SearchPage = () => {

    const { connection } = useConnection();
    const { wallet, connect, connecting, connected, publicKey, select } = useWallet();
    const wallets = useWallet();

    const [domains, setDomains] = useState([]);
    const [domainsBackup, setDomainsBackup] = useState([]);
    const [domainsMint, setDomainsMint] = useState([]);
    const [domainsMintBackup, setDomainsMintBackup] = useState([]);
    const [domainsName, setDomainsName] = useState([]);
    const [domainsNameBackup, setDomainsNameBackup] = useState([]);
    
    const router = useRouter();
    
    React.useEffect(() => {
        if(wallets?.publicKey){
            let id  = toast.loading("Loading subdomain nft...", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            getAllSubDomain().then((data)=>{
                setDomainsMintBackup(data[0])
                setDomainsNameBackup(data[1])
                setDomainsMint(data[0])
                setDomainsName(data[1])
                getSubdomainsImage(data[0], data[1]).then((data)=>{
                    setDomains(data); 
                    setDomainsBackup(data)
                    console.log(data)
                    toast.update(id, {render: "Loaded successfully!", type: "success", autoClose: 2000, isLoading: false });
                }).catch((err)=>{
                    console.log(err)
                    toast.update(id, {render: "Can't load the nft, please refresh!", type: "error", autoClose: 2000, isLoading: false });
                })
            })
            .catch((err)=>{               
                toast.update(id, {render: "Can't load the nft, please refresh!", type: "error", autoClose: 2000, isLoading: false });
                console.log(err)
            })
        }
    }, [wallets]);

    const getSubdomainsImage = async(mint: any, subdomains: any)=>{
        try{
            const data = {
                mint: mint,
                subdomains: subdomains
            }
            const res = await axios.post(`${API}/api/subdomain/get-search-subdomain`, data);
            if(res.data.status == "success"){
                return res.data.data
            }else{
                return []
            }
        }catch(err){
            return [];
        }
    }

    const searchSubdomains = async(searchName:any)=>{
        if(searchName == ""){
            setDomains(domainsBackup)
            setDomainsMint(domainsMintBackup)
            setDomainsName(domainsNameBackup)
        }else{
            const data1 = []
            const data2 = []
            console.log()
            setDomains(
                domainsBackup.filter((item, index)=>{
                    if(item){
                        if(item.subdomain.toLowerCase().includes(searchName.toLowerCase())){
                            data1.push(domainsMintBackup[index])
                            data2.push(domainsNameBackup[index])
                            return item
                        }                        
                    }
                })
            )
            setDomainsMint(data1)
            setDomainsName(data2)
            console.log(domainsBackup)
            console.log(domains)

        }
    }

    const chatHandle = async(wallet: any) => {
        console.log("wallet--->", wallet)
        const contact = await getNFTOwner(connection, wallet);
        open();
        navigation?.showCreateThread(contact);
    }

    const { ui, open, close, navigation } = useDialectUiId<ChatNavigationHelpers>(
        'dialect-bottom-chat'
    );

    return (
        <div className={styles.main}>
            <Header_BIZ />
            <BottomChat dialectId="dialect-bottom-chat" />
            <div className={styles.main_body}>
               {/* <button
                    onClick={() => {router.push("/sdns")}}
                    className={styles.backButton}
                >
                    Dashboard
                </button> */} 
                <input
                    className={styles.customItem}
                    placeholder="Search the Dao"
                    onChange={(e:any) => {
                    searchSubdomains(e.target.value)
                    }}
                />       
                <p className={styles.subIntro}>Welcome to the club</p>
                <div className={styles.innerSubdomainContainer}>
                    {
                        domains.map((item, index) => 
                            <div key={index}  className={styles.gridItems}>
                                <img
                                    className={styles.mainImage}
                                    src={item?.image == "" || item?.image == null ?`${API}/man.png`:item?.image.indexOf("https://")>=0?item?.image:`${API}/${item?.image}`}
                                    width={120}
                                    height={120}
                                    onClick={()=>chatHandle(domainsMint[index])}
                                    />
                                <button
                                    className={
                                        styles.layerButton
                                    }
                                    onClick={() => {
                                        window.open(`https://${domainsName[index]}.`, "_blank");
                                    }}
                                    >
                                    {`https://${domainsName[index]}.texaglo.com`}
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

const solanaWalletToDialectWallet = (
    wallet: any
  ): DialectSolanaWalletAdapter | null => {
    if (
      !wallet.connected ||
      wallet.connecting ||
      wallet.disconnecting ||
      !wallet.publicKey
    ) {
      return null;
    }
  
    return {
      publicKey: wallet.publicKey!,
      signMessage: wallet.signMessage,
      signTransaction: wallet.signTransaction,
      signAllTransactions: wallet.signAllTransactions,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      diffieHellman: wallet.wallet?.adapter?._wallet?.diffieHellman
        ? async (pubKey: any) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return wallet.wallet?.adapter?._wallet?.diffieHellman(pubKey);
          }
        : undefined,
    };
};

const SearchSubdomainPage: NextPage = () => {

    const [dialectSolanaWalletAdapter, setDialectSolanaWalletAdapter] =
    useState<DialectSolanaWalletAdapter | null>(null);

    const { connection } = useConnection();
    const wallets = useWallet();

    useEffect(() => {
        setDialectSolanaWalletAdapter(solanaWalletToDialectWallet(wallets));
    }, [wallets]);

    const solanaConfig: SolanaConfigProps = {
        wallet: dialectSolanaWalletAdapter,
    };

    const dialectConfig: ConfigProps = {
        environment: 'development',
        dialectCloud: {
            tokenStore: 'local-storage',
        },
        identity: {
            resolvers: [
            new DialectDappsIdentityResolver(),
            new SNSIdentityResolver(connection),
            // new CardinalTwitterIdentityResolver(connection),
            new CivicIdentityResolver(connection),
            ],
        },
    };

    return (
        <DialectSolanaSdk config={dialectConfig} solanaConfig={solanaConfig}>
            <DialectUiManagementProvider>
                <DialectThemeProvider theme="dark" variables={themeVariables}>
                    <SearchPage/>
                </DialectThemeProvider>
            </DialectUiManagementProvider>
        </DialectSolanaSdk>

    )
}
export default SearchSubdomainPage;