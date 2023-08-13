import {
    MediaRenderer,
    ThirdwebNftMedia,
    useAddress,
    useWallet,
  } from "@thirdweb-dev/react";
  import React, { useEffect, useState } from "react";
  import { GetStaticProps, GetStaticPaths } from "next";
  import { ThirdwebSDK } from "@thirdweb-dev/sdk";
  import { activeChain, nftDropAddress } from "../../../const/constants";
  import styles from "../../../styles/Token.module.css";
  import { Signer } from "ethers";
  import newSmartWallet from "../../../components/SmartWallet/SmartWallet";
  import SmartWalletConnected from "../../../components/SmartWallet/smartConnected";
  
  export default function TokenPage({ nft, contractMetadata }) {
    const [smartWalletAddress, setSmartWalletAddress] = useState(null);
    const [signer, setSigner] = useState();
  
    const address = useAddress();
    const wallet = useWallet();
  
    useEffect(() => {
      const createSmartWallet = async (nft) => {
        if (nft && smartWalletAddress == null && address && wallet) {
          const smartWallet = newSmartWallet(nft);
          console.log("personal wallet", address);
          await smartWallet.connect({
            personalWallet: wallet,
          });
          setSigner(await smartWallet.getSigner());
          console.log("signer", signer);
          setSmartWalletAddress(await smartWallet.getAddress());
          console.log("smart wallet address", await smartWallet.getAddress());
          return smartWallet;
        } else {
          console.log("smart wallet not created");
        }
      };
      createSmartWallet(nft);
    }, [nft, smartWalletAddress, address, wallet]);
  
    return (
      <>
        <div>
          <div className={styles.container}>
            <div className={styles.metadataContainer}>
              <ThirdwebNftMedia metadata={nft.metadata} className={styles.image} />
            </div>
  
            <div className={styles.listingContainer}>
              {contractMetadata && (
                <div className={styles.contractMetadataContainer}>
                  <MediaRenderer
                    src={contractMetadata.image}
                    className={styles.collectionImage}
                  />
                  <p className={styles.collectionName}>{contractMetadata.name}</p>
                </div>
              )}
              <h1 className={styles.title}>{nft.metadata.name}</h1>
              <p className={styles.collectionName}>Token ID #{nft.metadata.id}</p>
              {smartWalletAddress ? (
                <SmartWalletConnected signer={signer} />
              ) : (
                <div className={styles.btnContainer}>
                  <p>Loading...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export const getStaticProps = async (context) => {
    const tokenId = context.params?.tokenId;
  
    const sdk = new ThirdwebSDK(activeChain);
  
    const contract = await sdk.getContract(nftDropAddress);
  
    const nft = await contract.erc721.get(tokenId);
  
    let contractMetadata;
  
    try {
      contractMetadata = await contract.metadata.get();
    } catch (e) {}
  
    return {
      props: {
        nft,
        contractMetadata: contractMetadata || null,
      },
      revalidate: 1,
    };
  };
  
  export const getStaticPaths = async () => {
    const sdk = new ThirdwebSDK(activeChain);
  
    const contract = await sdk.getContract(nftDropAddress);
  
    const nfts = await contract.erc721.getAll();
  
    const paths = nfts.map((nft) => {
      return {
        params: {
          contractAddress: nftDropAddress,
          tokenId: nft.metadata.id,
        },
      };
    });
  
    return {
      paths,
      fallback: "blocking",
    };
  };
  