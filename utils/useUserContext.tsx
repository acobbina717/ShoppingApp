/* eslint-disable no-unused-vars */
import { Grid, Skeleton } from "@mantine/core";
import { useMemo } from "react";
import useSWR, { KeyedMutator } from "swr";
import { createContext, useContextSelector } from "use-context-selector";
import { v4 as uuid } from "uuid";
import fetcher from "./fetcher";

export const useGridColSkeleton = ({
  colCount = 16,
  height = 300,
  span = 6,
}) => {
  const skeletonLayoutCount = new Array(colCount).fill(1);
  return skeletonLayoutCount.map(() => (
    <Grid.Col key={uuid()} span={span} sm={span / 2} mb={30}>
      <Skeleton height={height} />
    </Grid.Col>
  ));
};

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserProps {
  authorizedUser: User | null;
  mutate: KeyedMutator<undefined | User | null>;
  error: any;
}
export const UserContext = createContext<UserProps>({
  authorizedUser: null,
  mutate: async () => null,
  error: undefined,
});

export const UserContextProvider = ({ children }) => {
  const { data: authorizedUser, error, mutate } = useSWR("", fetcher);

  const value = useMemo(
    () => ({
      authorizedUser,
      mutate,
      error,
    }),
    [authorizedUser, mutate, error]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const { authorizedUser, mutate, error } = useContextSelector(
    UserContext,
    (s) => s
  );
  return {
    authorizedUser,
    mutate,
    error,
  };
};
