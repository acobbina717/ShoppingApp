import { Button, ButtonProps } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../utils/useUserContext";

type AuthButtonProps = {
  // eslint-disable-next-line react/require-default-props
  otherProps?: ButtonProps;
};

const AuthButton = ({ otherProps }: AuthButtonProps) => {
  const router = useRouter();
  const { currentUser, setCurrentUser, signOut, authorizedUser } = useUser();

  if (authorizedUser) {
    setCurrentUser(authorizedUser);
  }

  const handleSignOut = async () => {
    try {
      const loggedOut = await signOut();
      if (loggedOut) {
        setCurrentUser(null);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentUser) {
    return (
      <Button
        variant="subtle"
        color="dark"
        component={Link}
        href="/auth"
        {...otherProps}
      >
        Sign In
      </Button>
    );
  }
  return (
    <Button
      variant="subtle"
      color="dark"
      onClick={handleSignOut}
      {...otherProps}
    >
      Sign Out
    </Button>
  );
};

export default AuthButton;
