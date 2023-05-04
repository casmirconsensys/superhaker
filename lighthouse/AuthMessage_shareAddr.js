import {
    recoverShards,
    getAuthMessage,
    saveShards,
    AuthMessage,
    shareToAddress,
    generate,
  } from "@lighthouse-web3/kavach";
  import { ethers } from "ethers";
  
  async function main() {
    let signer = new ethers.Wallet(
      "0x8218aa5dbf4dbec243142286b93e26af521b3e91219583595a06a7765abc9c8b"
    );
    let signer2 = new ethers.Wallet(
      "0x8218aa5dbf4dbec243142286b93e26af521b3e91219583595a06a7765abc9c99"
    );
    const cid = "QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwAV";
    const { masterKey, keyShards } = await generate();
  
    //save file
    {
      const authMessage: AuthMessage = await getAuthMessage(signer.address);
      const signedMessage = await signer.signMessage(authMessage.message);
  
      const { error, isSuccess } = await saveShards(
        signer.address,
        cid,
        signedMessage,
        keyShards
      );
      console.log(error == null); //true;
      console.log(isSuccess == true); //true;
    }
  
    //share file key to address address
    {
      const authMessage: AuthMessage = await getAuthMessage(signer.address);
      const signedMessage = await signer.signMessage(authMessage.message);
      const { error, isSuccess } = await shareToAddress(
        signer.address,
        cid,
        signedMessage,
        [signer2.address]
      );
  
      console.log(error == null); // true;
      console.log(isSuccess == true); //true;
    }
  
    //recover shared from address shared to
  
    {
      const authMessage: AuthMessage = await getAuthMessage(signer2.address);
      const signedMessage = await signer2.signMessage(authMessage.message);
  
      //retrieve 3 keys
      const { error, shards } = await recoverShards(
        signer2.address,
        cid,
        signedMessage,
        3
      );
      console.log(error == null); //true;
      console.log(shards.length === 3); // true;
    }
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });