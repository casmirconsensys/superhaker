import React from "react";
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function App() {

  const signAuthMessage = async() =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicKey = (await signer.getAddress()).toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
    const signedMessage = await signer.signMessage(
      messageRequested
    );
    return({publicKey: publicKey, signedMessage: signedMessage});
  }

  const shareFile = async() =>{
    const cid = "QmVkbVeTGA7RHgvdt31H3ax1gW3pLi9JfW6i9hDdxTmcGK";

    // Then get auth message and sign
    // Note: the owner of the file should sign the message.
    const {publicKey, signedMessage} = await signAuthMessage();

    const publicKeyUserB = ["0x201Bcc3217E5AA8e803B41d1F5B6695fFEbD5CeD"];
    
    const res = await lighthouse.shareFile(
      publicKey,
      publicKeyUserB,
      cid,
      signedMessage
    );

    console.log(res)
    /*
      data: {
        cid: "QmTTa7rm2nMjz6wCj9pvRsadrCKyDXm5Vmd2YyBubCvGPi",
        shareTo: ["0x201Bcc3217E5AA8e803B41d1F5B6695fFEbD5CeD"],
        status: "Success"
      }
    */
    /*Visit: 
        https://files.lighthouse.storage/viewFile/<cid>  
      To view encrypted file
    */
  }

  return (
    <div className="App">
      <button onClick={()=>shareFile()}>share file</button>
    </div>
  );
}

export default App;