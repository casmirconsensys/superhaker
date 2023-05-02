import { Polybase } from "@polybase/client"

const db = new Polybase({ defaultNamespace: "360nft" });
const collectionReference = db.collection("Playlist");

async function updateRecord () {
  // .create(functionName, args) args array is defined by the updateName fn in collection schema
  const recordData = await collectionReference
    .record("new-track")
    .call("updateArtist", [db.collection("Track").record("track-2")]);
}
