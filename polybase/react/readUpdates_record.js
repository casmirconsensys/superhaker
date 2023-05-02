import * as React from "react";
import { usePolybase, useDocument } from "@polybase/react";

export const Component = () => {
  const polybase = usePolybase();
  const { data, error, loading } =
    useDocument<OptionalCustomType>(polybase.collection("users").record("id"));

  return data.data.name;
};
