/* eslint-disable no-unused-vars */
import { Grid, Skeleton } from "@mantine/core";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import useSWR from "swr";
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

interface UserProps {
  currentUser: {} | null;
  setCurrentUser: Dispatch<SetStateAction<null>>;
}
export const UserContext = createContext<UserProps>({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const value = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (
  mode?: "/signin" | "/signup",
  body?: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }
) => {
  const { currentUser, setCurrentUser } = useContextSelector(
    UserContext,
    (s) => s
  );

  const { data: authorizedUser } = useSWR("/authuser", fetcher);

  const {
    data: authenticatedUser,
    isLoading: authenticatedUserLoading,
    error: authenticatedUserError,
  } = useSWR([mode, body], fetcher);

  const signOut = async () => {
    const loggedOut = await fetcher("/logout");
    return loggedOut;
  };

  return {
    currentUser,
    setCurrentUser,
    signOut,
    authorizedUser,
    authenticatedUser,
    authenticatedUserLoading,
  };
};
