import { getAuthMessage, AuthMessage, getJWT } from "@lighthouse-web3/kavach";
import { ethers } from "ethers";

async function main() {
  let signer = new ethers.Wallet(
    "0x8218aa5dbf4dbec243142286b93e26af521b3e91219583595a06a7765abc9c8b"
  );

  // get consensus message
  const authMessage: AuthMessage = await getAuthMessage(signer.address);
  const signedMessage = await signer.signMessage(authMessage.message);

  const { JWT, error } = await getJWT(signer.address, signedMessage);
  console.log(typeof JWT == "string"); //true;
  console.log(error == null); //true;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });