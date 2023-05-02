import * as React from "react";
import { usePolybase, useCollection } from "@polybase/react";

export const Component = () => {
  const polybase = usePolybase();
  const { data, error, loading } =
    useCollection<OptionalCustomType>(polybase.collection("users"));

  const usersEl = map(data, ({ data }) => {
    return <div key={data.id}>{data.name}</div>;
  });

  return usersEl;
};
