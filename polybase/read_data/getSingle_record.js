import { Polybase } from "@polybase/client"

const db = new Polybase({ defaultNamespace: "360nft" });
const collectionReference = db.collection("playlist");

async function getRecord () {
  const { data, block } = await collectionReference.record("id").get();
}
