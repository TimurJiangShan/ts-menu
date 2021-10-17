import { useAsync } from "./useAsync";
import React from "react";
import { cleanObject } from "./index";
import { useHttp } from "./http";

export interface User {
  name: string;
  token: string;
}

export const useUsers = (params: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();
  React.useEffect(() => {
    run(
      client("users", {
        data: cleanObject(params),
      })
    );
  }, [params]);

  return result;
};
