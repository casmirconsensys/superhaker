import { Polybase } from "@polybase/client"

const db = new Polybase({ defaultNamespace: "your-namespace" });
const collectionReference = db.collection("cities");

export async function listRecords () {
  const records = await collectionReference.get();
}
