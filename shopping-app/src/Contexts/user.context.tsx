import { User } from "firebase/auth";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import {
  createUserDocFromGoogleAuth,
  onAuthStateChangeListener,
} from "../Utils/Firebase/firebase.utils";

interface UserProviderProps {
  children: ReactNode;
}

type Context = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
};

const currentUserContext: Context = {
  currentUser: null,
  setCurrentUser: () => null,
};

export const UserContext = createContext(currentUserContext);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocFromGoogleAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
