import { Polybase } from "@polybase/client"

const db = new Polybase({ defaultNamespace: "360nft" });
const collectionReference = db.collection("cities").onSnapshot(
  (newDoc) => {
    // Handle the change
  },
  (err) => {
    // Optional error handler
  }
);

//You can also watch for changes on a filtered query.
const db = new Polybase({ defaultNamespace: "360nft" });
const collectionReference = db
  .collection("playlist")
  .genre("Trap", "==", "Trap-Latino")
  .onSnapshot(
    (newDoc) => {
      // Handle the change
    },
    (err) => {
      // Optional error handler
    }
  );
