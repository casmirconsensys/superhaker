import { shardKey, recoverKey } from "@lighthouse-web3/kavach";

async function main() {
  // known key customly generated or from ether random wallet privateKey
  // Note: Not all keys are shardable
  const knownKey =
    "554f886019b74852ab679258eb3cddf72f12f84dd6a946f8afc4283e48cc9467";
  const { isShardable, keyShards } = await shardKey(knownKey);
  console.log(isShardable); // true

  //recover keys from shards
  const { masterKey } = await recoverKey(keyShards);

  //check if the key recovered was recovered
  console.log(masterKey === knownKey); //true
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });