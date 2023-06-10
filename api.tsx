import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  Connection,
} from "@solana/web3.js";
import {
  treaseryWallet,
  API,
  SOL,
  dev,
  devnetRPC,
  mainnetRPC,
  programAddress,
  programAddressForSubdomain,
  royaltyAddress,
  collectionMint,
} from "./config";
import { Program, Provider, web3, BN } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";

import idl from "./idl.json";
import axios from "axios";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";

import {
  Metaplex,
  keypairIdentity,
  walletAdapterIdentity,
  bundlrStorage,
  toMetaplexFile,
  toBigNumber,
  findMetadataPda,
  findMasterEditionV2Pda,
  findCollectionAuthorityRecordPda,
  amount,
} from "@metaplex-foundation/js";

// import { TOKEN_PROGRAM_ID, Token, MINT_SIZE,
//         createAssociatedTokenAccountInstruction,
//         createInitializeMintInstruction,
//         getAssociatedTokenAddress,
//         } from("@solana/spl-token");

const {
  TOKEN_PROGRAM_ID,
  Token,
  MINT_SIZE,
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  getAssociatedTokenAddress,
} = require("@solana/spl-token");

const idlData: any = idl;

var connectionDefault: any;

if (dev) {
  connectionDefault = new Connection(devnetRPC, {
    commitment: "confirmed",
    // confirmTransactionInitialTimeout: 180000,
  });
} else {
  connectionDefault = new Connection(mainnetRPC, {
    commitment: "confirmed",
    confirmTransactionInitialTimeout: 120000,
  });
}

export const requestAirdrop = async (connection, wallet) => {
  try{
    let fromAirdropSignature = await connection.requestAirdrop(
      wallet.publicKey,
      anchor.web3.LAMPORTS_PER_SOL * 0.2,
    );
    await connection.confirmTransaction(fromAirdropSignature);
    return "success"
  }catch(error){
    console.log("error: ", error.message);
    const errMsg = error.message;
    console.log("error: request airdrop Skip");
    if (errMsg.indexOf("signature") > 0) {
      return "success"    
    } else {
      return "error"
    }
  }
}

export const sendSOLForFileContent = async (connection, publicKey, wallets, gateOwnerAddress, sol) => {
  try {
    const amount1:any = (LAMPORTS_PER_SOL * sol * 0.03).toFixed(0);
    const amount2:any = (LAMPORTS_PER_SOL* sol - amount1).toFixed(0);
    var transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(treaseryWallet),
        lamports: amount1,
      }),
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(gateOwnerAddress),
        lamports: amount2,
      })
    );
    if (transaction) {
      console.log("Txn created successfully");
    }
    // Setting the variables for the transaction
    transaction.feePayer = publicKey;
    let blockhashObj = await connection.getLatestBlockhash();
    console.log(blockhashObj);
    transaction.recentBlockhash = await blockhashObj.blockhash;
    // Request creator to sign the transaction (allow the transaction)
    let signed = await wallets.signTransaction(transaction);
    // The signature is generated
    let signature = await connection.sendRawTransaction(signed.serialize());
    // Confirm whether the transaction went through or not
    console.log(signature);
    await connection.confirmTransaction(signature);
    return signature;
  } catch (error) {
    console.log(error.message);
    const errMsg = error.message;
    if (errMsg.indexOf("signature") > 0) {
      return error.message;
    } else {
      return 0;
    }
    
  }
};

export const sendSOL = async (connection, publicKey, wallets, sol) => {
  try {
    const amount = LAMPORTS_PER_SOL * sol;
    var transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(treaseryWallet),
        lamports: amount,
      })
    );
    if (transaction) {
      console.log("Txn created successfully");
    }
    // Setting the variables for the transaction
    transaction.feePayer = publicKey;
    let blockhashObj = await connection.getLatestBlockhash();
    console.log(blockhashObj);
    transaction.recentBlockhash = await blockhashObj.blockhash;
    // Request creator to sign the transaction (allow the transaction)
    let signed = await wallets.signTransaction(transaction);
    // The signature is generated
    let signature = await connection.sendRawTransaction(signed.serialize());
    // Confirm whether the transaction went through or not
    console.log(signature);
    await connection.confirmTransaction(signature);
    return signature;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export const searchSubDomain = async (data) => {
  try {
    const res = await axios.post(`${API}/api/subdomain/search-subdomain`, data);
    if (res.data.status == "success") {
      return res.data.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getAllSubDomainAPI = async () => {
  try {
    const res = await axios.post(`${API}/api/subdomain/get-all-subdomain`);
    if (res.data.status == "success") {
      return res.data.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const createSubDomain = async (data) => {
  try {
    const res = await axios.post(`${API}/api/subdomain/create-subdomain`, data);
    if (res.data.status == "success") {
      return "Created subdomain successfully!";
    } else if (res.data.status == "error") {
      return "Got Error!!";
    } else {
      return res.data.status;
    }
  } catch (err) {
    console.log(err);
    return "Got Error!";
  }
};

export const checkSubDomain = async (data) => {
  try {
    const res = await axios.post(
      `${API}/api/subdomain/check-user-subdomain`,
      data
    );
    return res;
  } catch (err) {
    return "error";
  }
};

const getUserData = async (mintAuthority) => {
  return getPDAPublicKey(
    [Buffer.from("userdata"), mintAuthority.toBuffer()],
    programID
  );
};

const getPDAPublicKey = async (seeds, programId) => {
  return (await getPDA(seeds, programId))[0];
};

const getPDA = async (seeds, programId) => {
  return web3.PublicKey.findProgramAddress(seeds, programId);
};

export const getMetadata = async (mint) => {
  return await getPDAPublicKey(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
};

const getMasterEdition = async (mint) => {
  return await getPDAPublicKey(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
      Buffer.from("edition"),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
};

const TOKEN_METADATA_PROGRAM = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const CANDY_MACHINE_V2_PROGRAM = new PublicKey(
  "cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ"
);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const programID = new PublicKey(programAddressForSubdomain);
const royalty = new PublicKey(royaltyAddress);

const getProvider = async (connection, wallet) => {
  // const provider = new Provider(
  //     connection, wallet, { preflightCommitment: "confirmed" },
  // );
  const provider = new anchor.AnchorProvider(
    connection,
    wallet,
    anchor.AnchorProvider.defaultOptions()
  );
  return provider;
};

export const initCandyMachine = async (connection, wallet) => {
  try {
    console.log("initializePool starting...");
    const provider = await getProvider(connection, wallet);
    let program = new Program(idlData, programID, provider);

    const contractDataPublic = await getPDAPublicKey(
      [Buffer.from("contractdata")],
      programID
    );
    const treasuryDataPublic = await getPDAPublicKey(
      [Buffer.from("treasury")],
      programID
    );

    console.log(
      "contractDataPublic address ",
      (await contractDataPublic).toBase58()
    );
    console.log(
      "treasuryDataPublic address ",
      (await treasuryDataPublic).toBase58()
    );

    console.log(provider.wallet.publicKey.toBase58());

    const tx = await program.rpc.initialize(new BN(5555), {
      accounts: {
        contractData: await contractDataPublic,
        treasury: await treasuryDataPublic,
        authority: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
    });

    console.log("Your transaction signature", tx);
    console.log("initialize finished");
    return "success";
  } catch (error) {
    console.log(error.message);
    console.log("error: initialize Skip");
    return "error";
  }
};

export const updateFee = async (connection, wallet) => {
  try {
    console.log("updateFee starting...");
    const provider = await getProvider(connection, wallet);
    let program = new Program(idlData, programID, provider);
    const contractDataPublic = await getPDAPublicKey(
      [Buffer.from("contractdata")],
      programID
    );
    console.log(contractDataPublic.toBase58());
    console.log(provider.wallet.publicKey.toBase58());
    const tx = await program.rpc.updateFee(new BN(1), {
      accounts: {
        contractData: contractDataPublic,
        authority: provider.wallet.publicKey,
      },
    });
    console.log("Your transaction signature", tx);
    console.log(tx);
    return "success";
  } catch (err) {
    console.log(err.message);
    console.log(err);
    console.log("error: updateFee Skip");
    return "error";
  }
};

export const mintCollection = async (
  subdomain,
  connection,
  wallet,
  tokenId,
  sol
) => {
  let collectionAuthorityRecord,
    collectionMint,
    collectionMetadata,
    collectionMasterEdition,
    collectionUpdateAuthority;
  try {
    console.log("mint starting...");

    const [updateAuthorityPDA, bump] = await getPDA(
      [Buffer.from("update")],
      programID
    );
    collectionAuthorityRecord = updateAuthorityPDA.toBase58();
    collectionUpdateAuthority = updateAuthorityPDA.toBase58();

    const contractDataPublic = await getPDAPublicKey(
      [Buffer.from("contractdata")],
      programID
    );
    const treasuryDataPublic = await getPDAPublicKey(
      [Buffer.from("treasury")],
      programID
    );
    const subdomainData = await getPDAPublicKey(
      [Buffer.from(subdomain)],
      programID
    );

    const provider = await getProvider(connection, wallet);
    let program = new Program(idlData, programID, provider);

    const lamports =
      await program.provider.connection.getMinimumBalanceForRentExemption(
        MINT_SIZE
      );

    const mintKey = web3.Keypair.generate();
    console.log(wallet.publicKey.toBase58(), lamports, MINT_SIZE);
    const NftTokenAccount = await getAssociatedTokenAddress(
      mintKey.publicKey,
      wallet.publicKey
    );
    console.log("NFT Account: ", NftTokenAccount.toBase58());

    const metadataAddress = await getMetadata(mintKey.publicKey);
    const masterEdition = await getMasterEdition(mintKey.publicKey);

    collectionMint = mintKey.publicKey.toBase58();
    collectionMetadata = metadataAddress.toBase58();
    collectionMasterEdition = masterEdition.toBase58();

    console.log("Mint key: ", mintKey.publicKey.toString());
    console.log("User: ", provider.wallet.publicKey.toString());

    console.log("Metadata address: ", metadataAddress.toBase58());
    console.log("MasterEdition: ", masterEdition.toBase58());
    console.log("subdomain: ", subdomain);
    console.log("tokenId: ", tokenId);

    const amount = LAMPORTS_PER_SOL * sol; // 0.1;

    const tx = await program.rpc.mintNft(
      royalty,
      `https://arweave.net/9MY-M2zNET9rWKw0sn-MauUWQevFnPiVPcptreuC68Q`,
      subdomain,
      // "test1230980"
      "update",
      {
        accounts: {
          mintAuthority: provider.wallet.publicKey,
          mint: mintKey.publicKey,
          tokenAccount: NftTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          metadata: metadataAddress,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
          rent: web3.SYSVAR_RENT_PUBKEY,
          masterEdition: masterEdition,
          contractData: await contractDataPublic,
          userData: await getUserData(provider.wallet.publicKey),
          treasury: await treasuryDataPublic,
          subdomains: await subdomainData,
        },
        signers: [mintKey],
        instructions: [
          web3.SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mintKey.publicKey,
            space: MINT_SIZE,
            programId: TOKEN_PROGRAM_ID,
            lamports,
          }),
          createInitializeMintInstruction(
            mintKey.publicKey,
            0,
            provider.wallet.publicKey,
            provider.wallet.publicKey
          ),
          createAssociatedTokenAccountInstruction(
            provider.wallet.publicKey,
            NftTokenAccount,
            provider.wallet.publicKey,
            mintKey.publicKey
          ),
        ],
      }
    );

   
    console.log("Your transaction signature", tx);
    console.log("mint finished");
    return [
      "success",
      tx,
      collectionAuthorityRecord,
      collectionMint,
      collectionMetadata,
      collectionMasterEdition,
      collectionUpdateAuthority,
    ];
  } catch (error) {
    console.log(error.message);
    const errMsg = error.message;
    console.log("error: mint Skip");
    if (errMsg.indexOf("signature") > 0) {
      return [
        "success",
        Math.random(),
        collectionAuthorityRecord,
        collectionMint,
        collectionMetadata,
        collectionMasterEdition,
        collectionUpdateAuthority,
      ];
    } else if (errMsg.indexOf("Domain is exist already") > 0) {
      return ["Domain is exist already", "", ""];
    } else {
      return ["error", "", ""];
    }
  }
};

export const mintNFTCollection = async (
  collectionAuthorityRecord,
  collectionMint,
  collectionMetadata,
  collectionMasterEdition,
  collectionUpdateAuthority,
  uri,
  subdomain,
  tokenId,
  connection,
  wallet,
  sol
) => {
  let mintPubKey;
  try {
    console.log("mint starting...");
    const contractDataPublic = await getPDAPublicKey(
      [Buffer.from("contractdata")],
      programID
    );
    const treasuryDataPublic = await getPDAPublicKey(
      [Buffer.from("treasury")],
      programID
    );
    let subdomainData: any;
    if (uri == "uri") {
      subdomainData = await getPDAPublicKey(
        [Buffer.from(subdomain)],
        programID
      );
    } else {
      subdomainData = await getPDAPublicKey([Buffer.from(uri.name)], programID);
    }

    const provider = await getProvider(connection, wallet);
    let program = new Program(idlData, programID, provider);

    const lamports =
      await program.provider.connection.getMinimumBalanceForRentExemption(
        MINT_SIZE
      );

    const mintKey = web3.Keypair.generate();
    mintPubKey = mintKey.publicKey.toBase58();
    console.log(wallet.publicKey.toBase58(), lamports, MINT_SIZE);
    const NftTokenAccount = await getAssociatedTokenAddress(
      mintKey.publicKey,
      wallet.publicKey
    );
    console.log("NFT Account: ", NftTokenAccount.toBase58());

    const metadataAddress = await getMetadata(mintKey.publicKey);
    const masterEdition = await getMasterEdition(mintKey.publicKey);

    console.log("Mint key: ", mintKey.publicKey.toString());
    console.log("User: ", provider.wallet.publicKey.toString());

    console.log("Metadata address: ", metadataAddress.toBase58());
    console.log("MasterEdition: ", masterEdition.toBase58());
    // console.log("subdomain: ", subdomain)
    // console.log("tokenId: ", tokenId)

    const amount = LAMPORTS_PER_SOL * sol; // 0.1;
    let realURI =
      uri == "uri"
        ? `{yourAPI}?domain=${subdomain}&tokenId=${tokenId}`
        : uri.uri;
    let realTitle = uri == "uri" ? `${subdomain}` : uri.name;
    console.log("realURI-->", realURI);
    console.log("realTitle-->", realTitle);
    const tx = await program.rpc.mintNftcollection(
      royalty,
      realURI,
      realTitle,
      // "test1230980"
      "update",
      {
        accounts: {
          mintAuthority: provider.wallet.publicKey,
          mint: mintKey.publicKey,
          tokenAccount: NftTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          metadata: metadataAddress,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
          rent: web3.SYSVAR_RENT_PUBKEY,
          masterEdition: masterEdition,
          contractData: await contractDataPublic,
          userData: await getUserData(provider.wallet.publicKey),
          treasury: await treasuryDataPublic,
          subdomains: await subdomainData,
          collectionAuthorityRecord: new PublicKey(collectionAuthorityRecord),
          collectionMint: new PublicKey(collectionMint),
          collectionMetadata: new PublicKey(collectionMetadata),
          collectionMasterEdition: new PublicKey(collectionMasterEdition),
          collectionUpdateAuthority: new PublicKey(collectionAuthorityRecord),
        },
        signers: [mintKey],
        instructions: [
          SystemProgram.transfer({
            fromPubkey: provider.wallet.publicKey,
            toPubkey: new PublicKey(treaseryWallet),
            lamports: amount,
          }),
          web3.SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mintKey.publicKey,
            space: MINT_SIZE,
            programId: TOKEN_PROGRAM_ID,
            lamports,
          }),
          createInitializeMintInstruction(
            mintKey.publicKey,
            0,
            provider.wallet.publicKey,
            provider.wallet.publicKey
          ),
          createAssociatedTokenAccountInstruction(
            provider.wallet.publicKey,
            NftTokenAccount,
            provider.wallet.publicKey,
            mintKey.publicKey
          ),
        ],
      }
    );

    const resData = await connection.getParsedTransaction(tx, {
      maxSupportedTransactionVersion: 0,
    });

    console.log("Your transaction signature", tx);
    console.log("mint finished");
    return ["success", tx, mintPubKey];
  } catch (error) {
    console.log(error.message);
    const errMsg = error.message;
    console.log("error: mint Skip");
    if (errMsg.indexOf("signature") > 0) {
      return ["success", Math.random(), mintPubKey];
    } else if (errMsg.indexOf("Domain is exist already") > 0) {
      return ["Domain is exist already", "", ""];
    } else {
      return ["error", "", ""];
    }
  }
};

export const mintNFT = async (subdomain, connection, wallet, tokenId, sol) => {
  try {
    console.log("mint starting...");
    const contractDataPublic = await getPDAPublicKey(
      [Buffer.from("contractdata")],
      programID
    );
    const treasuryDataPublic = await getPDAPublicKey(
      [Buffer.from("treasury")],
      programID
    );
    const subdomainData = await getPDAPublicKey(
      [Buffer.from(subdomain)],
      programID
    );

    const provider = await getProvider(connection, wallet);
    let program = new Program(idlData, programID, provider);

    const lamports =
      await program.provider.connection.getMinimumBalanceForRentExemption(
        MINT_SIZE
      );

    const mintKey = web3.Keypair.generate();
    console.log(wallet.publicKey.toBase58(), lamports, MINT_SIZE);
    const NftTokenAccount = await getAssociatedTokenAddress(
      mintKey.publicKey,
      wallet.publicKey
    );
    console.log("NFT Account: ", NftTokenAccount.toBase58());

    const metadataAddress = await getMetadata(mintKey.publicKey);
    const masterEdition = await getMasterEdition(mintKey.publicKey);

    console.log("Mint key: ", mintKey.publicKey.toString());
    console.log("User: ", provider.wallet.publicKey.toString());

    console.log("Metadata address: ", metadataAddress.toBase58());
    console.log("MasterEdition: ", masterEdition.toBase58());
    console.log("subdomain: ", subdomain);
    console.log("tokenId: ", tokenId);

    const amount = LAMPORTS_PER_SOL * sol; // 0.1;

    const tx = await program.rpc.mintNft(
      royalty,
      `{yourAPI}/ipfs?domain=${subdomain}&tokenId=${tokenId}`,
      subdomain,
      // "test1230980"
      "ok",
      {
        accounts: {
          mintAuthority: provider.wallet.publicKey,
          mint: mintKey.publicKey,
          tokenAccount: NftTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          metadata: metadataAddress,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
          rent: web3.SYSVAR_RENT_PUBKEY,
          masterEdition: masterEdition,
          contractData: await contractDataPublic,
          userData: await getUserData(provider.wallet.publicKey),
          treasury: await treasuryDataPublic,
          subdomains: await subdomainData,
        },
        signers: [mintKey],
        instructions: [
          SystemProgram.transfer({
            fromPubkey: provider.wallet.publicKey,
            toPubkey: new PublicKey(treaseryWallet),
            lamports: amount,
          }),
          web3.SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mintKey.publicKey,
            space: MINT_SIZE,
            programId: TOKEN_PROGRAM_ID,
            lamports,
          }),
          createInitializeMintInstruction(
            mintKey.publicKey,
            0,
            provider.wallet.publicKey,
            provider.wallet.publicKey
          ),
          createAssociatedTokenAccountInstruction(
            provider.wallet.publicKey,
            NftTokenAccount,
            provider.wallet.publicKey,
            mintKey.publicKey
          ),
        ],
      }
    );

    const resData = await connection.getParsedTransaction(tx, {
      maxSupportedTransactionVersion: 0,
    });

    console.log("Your transaction signature", tx);
    console.log("mint finished");
    return ["success", tx, resData.meta.postTokenBalances[0].mint];
  } catch (error) {
    console.log(error.message);
    const errMsg = error.message;
    console.log("error: mint Skip");
    if (errMsg.indexOf("signature") > 0) {
      return ["success", Math.random(), ""];
    } else if (errMsg.indexOf("Domain is exist already") > 0) {
      return ["Domain is exist already", "", ""];
    } else {
      return ["error", "", ""];
    }
  }
};

export const withrawSol = async (connection, wallet) => {
  try {
    console.log("withdraw starting...");
    const contractDataPublic = await getPDAPublicKey(
      [Buffer.from("contractdata")],
      programID
    );
    const treasuryDataPublic = await getPDAPublicKey(
      [Buffer.from("treasury")],
      programID
    );

    const provider = await getProvider(connection, wallet);
    let program = new Program(idlData, programID, provider);
    const tx = await program.rpc.withdraw(new BN(1), {
      accounts: {
        contractData: await contractDataPublic,
        treasury: await treasuryDataPublic,
        authority: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
    });
    console.log("Your transaction signature", tx);
    console.log("withdraw finished");
    return "success";
  } catch (error) {
    console.log("error: withdraw Skip ", error.message);
    return "error";
  }
};

export const finalize = async (connection, wallet) => {
  try {
    console.log("finalize starting...");
    const contractDataPublic = await getPDAPublicKey(
      [Buffer.from("contractdata")],
      programID
    );
    const treasuryDataPublic = await getPDAPublicKey(
      [Buffer.from("treasury")],
      programID
    );

    const provider = await getProvider(connection, wallet);
    let program = new Program(idlData, programID, provider);

    const tx = await program.rpc.finalize({
      accounts: {
        contractData: await contractDataPublic,
        userData: await getUserData(provider.wallet.publicKey),
        treasury: await treasuryDataPublic,
        authority: provider.wallet.publicKey,
      },
    });
    console.log("Your transaction signature", tx);
    console.log("finalize finished");
    return "success";
  } catch (error) {
    console.log(error.message);
    console.log("error: finalize Skip");
    return "error";
  }
};

export const getSubDomain = async (subdomain) => {
  try {
    let connection;
    if (dev) {
      connection = new Connection(devnetRPC);
    } else {
      connection = new Connection(mainnetRPC);
    }

    const txs = [];
    // Walk backward
    let lastTransactions = await connection.getConfirmedSignaturesForAddress2(
      programID
    );
    let before = lastTransactions[lastTransactions.length - 1].signature;
    let signatureList = lastTransactions.map(
      (transaction) => transaction.signature
    );
    let transactionDetails = await connection.getParsedTransactions(
      signatureList,
      { maxSupportedTransactionVersion: 0 }
    );

    txs.push(...transactionDetails);

    while (true) {
      const newTransactions =
        await connection.getConfirmedSignaturesForAddress2(programID, {
          before,
        });
      if (newTransactions.length === 0) break;
      let signatureList = newTransactions.map(
        (transaction) => transaction.signature
      );
      let transactionDetails = await connection.getParsedTransactions(
        signatureList,
        { maxSupportedTransactionVersion: 0 }
      );
      txs.push(...transactionDetails);
      before = newTransactions[newTransactions.length - 1].signature;
    }
    console.log(txs);
    const domains = [];
    for (let i = 0; i < txs.length; i++) {
      const logs = txs[i].meta.logMessages;
      // if(logs.length == 92){
      //     domains.push(logs[33].split("log:")[1].trim())
      // }
      if (logs.length == 93 || logs.length == 94) {
        if (logs[35].includes("{yourAPI}") || logs[35].includes("{yours3}")) {
          domains.push(logs[34].split("log:")[1].trim());
        }
      }
      if (logs.length == 95) {
        if (logs[37].includes("{yourAPI}") || logs[37].includes("{yours3}")) {
          domains.push(logs[36].split("log:")[1].trim());
        }
      }
      if (logs.length == 97) {
        if (logs[35].includes("{yourAPI}") || logs[35].includes("{yours3}")) {
          domains.push(logs[34].split("log:")[1].trim());
        }
      }
      if (logs.length == 99) {
        if (logs[37].includes("{yourAPI}") || logs[37].includes("{yours3}")) {
          domains.push(logs[36].split("log:")[1].trim());
        }
      }
      // if(logs.length == 87){
      //     domains.push(logs[33].split("log:")[1].trim())
      // }
      // if(logs.length == 88){
      //     domains.push(logs[34].split("log:")[1].trim())
      // }
      // if(logs.length == 89){
      //     domains.push(logs[35].split("log:")[1].trim())
      // }
      // if(logs.length == 90){
      //     domains.push(logs[36].split("log:")[1].trim())
      // }
    }
    let flag = true;
    for (let i = 0; i < domains.length; i++) {
      if (subdomain == domains[i]) {
        flag = false;
        break;
      }
    }
    console.log(flag);
    console.log("domains", domains);
    return [flag, domains.length];
  } catch (error) {
    console.log(error.message);
    console.log("error: searching");
    return [false, 0];
  }
};

export const getAllSubDomain = async () => {
  try {
    
    // get the all subdomain data using texaglo backend
    const subdomainFromAPI = await getAllSubDomainAPI();
    const _domains = [], _domainsMint = [];
    for(let i = 0; i <subdomainFromAPI.length; i++){
      if(subdomainFromAPI[i]?.subdomain && subdomainFromAPI[i]?.mintAddress){
        _domains.push(subdomainFromAPI[i].subdomain)
        _domainsMint.push(subdomainFromAPI[i].mintAddress)
      }
    }
    return [_domainsMint, _domains];

    // get the all subdomain data using all transaction according to smart contract  on solana
    let connection;
    if (dev) {
      connection = new Connection(devnetRPC);
    } else {
      connection = new Connection(mainnetRPC);
    }

    const txs = [];
    // Walk backward
    let lastTransactions = await connection.getConfirmedSignaturesForAddress2(
      programID
    );
    let before = lastTransactions[lastTransactions.length - 1].signature;
    console.log("before ", before)
    console.log("before ", lastTransactions)
    let signatureList = lastTransactions.map((transaction) => transaction.signature);
    let transactionDetails = await connection.getParsedTransactions(
      signatureList,
      { maxSupportedTransactionVersion: 0 }
    );

    txs.push(...transactionDetails);

    while (true) {
      try{
        const newTransactions = await connection.getConfirmedSignaturesForAddress2(programID, {before,});
        console.log(newTransactions)
        if (newTransactions.length === 0) break;
        let signatureList = newTransactions.map((transaction) => transaction.signature);
        let transactionDetails = await connection.getParsedTransactions(
          signatureList,
          { maxSupportedTransactionVersion: 0 }
        );
        txs.push(...transactionDetails);
        before = newTransactions[newTransactions.length - 1].signature;
      }catch(err){
        console.log(err)
      }
    }
    console.log(txs);
    const domainsMint = [];
    const domains = [];
    for (let i = 0; i < txs.length; i++) {
      const logs = txs[i].meta.logMessages;

      if (logs.length == 93 || logs.length == 94) {
        if (logs[35].includes("{yourapi}") || logs[35].includes("{yours3}")) {
          domainsMint.push(txs[i].meta.postTokenBalances[0].mint);
          domains.push(logs[34].split("log:")[1].trim());
        }
      }
      if (logs.length == 95) {        
        if (logs[37].includes("{yourapi}") || logs[37].includes("{yours3}")) {
          domainsMint.push(txs[i].meta.postTokenBalances[0].mint);
          domains.push(logs[36].split("log:")[1].trim());
        }
      }
      if (logs.length == 97) {
        if (logs[35].includes("{yourapi}") || logs[35].includes("{yours3}")) {
          domainsMint.push(txs[i].meta.postTokenBalances[0].mint);
          domains.push(logs[34].split("log:")[1].trim());
        }
      }
      if (logs.length == 99) {
        if (logs[37].includes("{yourai}") || logs[37].includes("{yours3}")) {
          domainsMint.push(txs[i].meta.postTokenBalances[0].mint);
          domains.push(logs[36].split("log:")[1].trim());
        }
      }

    }
    console.log("domains", domains);
    console.log("domainsMint", domainsMint);
    return [domainsMint, domains];
  } catch (error) {
    console.log(error.message);
    console.log("error: searching");
    return [[], []];
  }
};

export const getPoolInfo = async (connection, wallet) => {
  try {
    console.log("finalize starting...");
    // console.log(await getTxs(connection, programID))
    const provider = await getProvider(connection, wallet);
    let program = new Program(idlData, programID, provider);
    console.log(await program.account);
    console.log(await program.account.userData.all());
    console.log(await program.account.contractData.all());
    console.log(await program.account.subDomainData.all());
    const userData = await program.account.userData.all();
    return "success";
  } catch (error) {
    console.log(error.message);
    console.log("error: finalize Skip");
    return "error";
  }
};

export const getNFTOwner = async (connection, nftMintAddress) => {
  try {
    const largestAccounts = await connection.getTokenLargestAccounts(
      new PublicKey(nftMintAddress)
    );
    const largestAccountInfo = await connection.getParsedAccountInfo(
      largestAccounts.value[0].address
    );
    console.log(largestAccountInfo.value.data.parsed.info.owner);
    return largestAccountInfo.value.data.parsed.info.owner;
  } catch (err) {
    return 0;
  }
};

export const getAllNFTs = async (wallet: any) => {
  try {
    const techNFT = [];
    const result = await getParsedNftAccountsByOwner({
      publicAddress: wallet,
      connection: connectionDefault,
    });
    for (let i = 0; i < result.length; i++) {
      if (
        result[i].data.symbol == "TECH" &&
        result[i].data.uri.includes("ipfs?")
      ) {
        techNFT.push(result[i]);
      }
    }
    console.log(result);
    return techNFT;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getAllNFTsNew = async (wallet: any) => {
  try {
    console.log("Get ALL NFT FROM WALLET");
    const techNFT = [];
    const metaplex = new Metaplex(connectionDefault);
    const owner = new PublicKey(wallet);
    const allNFTs: any = await metaplex.nfts().findAllByOwner({ owner: owner });
    console.log(allNFTs);
    for (let i = 0; i < allNFTs.length; i++) {
      if ((
        allNFTs[i].symbol == "TECH" &&
        allNFTs[i].uri.includes("ipfs?") &&
        allNFTs[i]?.collection?.key.toBase58() == collectionMint)||
        (allNFTs[i].symbol == "TECH" &&
        allNFTs[i].uri.includes("{yourai}") &&
        allNFTs[i]?.collection?.key.toBase58() == collectionMint)
      ) {
        techNFT.push(allNFTs[i]);
      }
    }
    return techNFT;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getMetadataFromMintAddress = async (mint: any) => {
  try {
    console.log("Get NFT Metadata");
    const metaplex = new Metaplex(connectionDefault);
    const mintAddress = new PublicKey(mint);
    const metadata: any = await metaplex.nfts().findByMint({mintAddress: mintAddress})
    console.log(metadata);
    return metadata
  } catch (err) {
    console.log(err);
    return "error";
  }
};

export const fileUploadArweave = async (wallet) => {
  try {
    console.log("Get NFT Metadata");
    
    const metaplex = Metaplex.make(connectionDefault)
    .use(walletAdapterIdentity(wallet))
    .use(bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: process.env.DEVNET_RPC,
        timeout: 60000,
    }));

    const fileName = "test.txt";
    const jsonMetaplexFile = toMetaplexFile(Buffer.from(JSON.stringify({"test":"test"}), 'utf8'), fileName);
    const jsonUri = await metaplex.storage().upload(jsonMetaplexFile);
    console.log(jsonUri)
    
  } catch (err) {
    console.log(err);
    return "error";
  }
};
