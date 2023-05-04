import { generate, recoverKey } from "@lighthouse-web3/kavach";

async function main() {
  const { masterKey, keyShards } = await generate();

  const { masterKey: recoveredKey } = await recoverKey(keyShards);
  console.log(masterKey === recoveredKey); //true
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });