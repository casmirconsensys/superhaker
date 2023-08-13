import { ZoraTestnet } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// If used on the FRONTEND pass your 'clientId'
const sdk = new ThirdwebSDK(ZoraTestnet, {
  clientId: "YOUR_CLIENT_ID",
});
// --- OR ---
// If used on the BACKEND pass your 'secretKey'
const sdk = new ThirdwebSDK(ZoraTestnet, {
  secretKey: "YOUR_SECRET_KEY",
});

const contract = await sdk.getContract("0x4E1E4ceB15ab6390F35259e77dd66563B234e31D");

await contract.metadata.set({
    name: "My Contract",
    description: "My contract description"
  })

  await contract.metadata.update({
    description: "My new contract description"
  })

  const metadata = await contract.metadata.get();
  console.log(metadata);