import { getAuthMessage, saveShards, generate } from "@lighthouse-web3/kavach";
import { ethers } from "ethers";

async function main() {
  const signer = new ethers.Wallet(
    "0x8218aa5dbf4dbec243142286b93e26af521b3e91219583595a06a7765abc9c8b"
  );

  const { masterKey, keyShards } = await generate();

  const authMessage = await getAuthMessage(signer.address);
  const signedMessage = await signer.signMessage(authMessage.message);

  const { error, isSuccess } = await saveShards(
    signer.address,
    "QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH",
    signedMessage,
    keyShards
  );

  console.log(error === null); // true;
  console.log(isSuccess === true); //true;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });