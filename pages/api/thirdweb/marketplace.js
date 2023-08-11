import { "ethereum" } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// If used on the FRONTEND pass your 'clientId'
const sdk = new ThirdwebSDK("ethereum", {
  clientId: "YOUR_CLIENT_ID",
});
// --- OR ---
// If used on the BACKEND pass your 'secretKey'
const sdk = new ThirdwebSDK("ethereum", {
  secretKey: "YOUR_SECRET_KEY",
});

const contract = await sdk.getContract("0x0000000000000000000000000000000000000000");