import { Polybase } from "@polybase/client"

const db = new Polybase({ defaultNamespace: "360nft" });
const collectionReference = db.collection("Playlist");

async function createRecord () {
  // .create(args) args array is defined by the constructor fn
  const recordData = await collectionReference.create([
    "new-track", 
    "New Track",", 
    db.collection("Playlist").record("track-1")
  ]);
}
