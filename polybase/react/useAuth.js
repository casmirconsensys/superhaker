import * as React from "react";
import { useAuth } from "@polybase/react";

export const Component = () => {
  const { auth, state, loading } = useAuth();

  // `state` is null if not logged in, or logged in state e.g. { type: "metamask", userId: "..." }

  // `auth` is the prop passed to AuthProvider as auth 

  return (
    <div>
      <button onClick={() => auth.signIn()}>Sign In</button>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  )
};
