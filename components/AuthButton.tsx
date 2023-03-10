import { Button, ButtonProps } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import fetcher from "../utils/fetcher";

import { useUser } from "../utils/useUserContext";

type AuthButtonProps = {
  // eslint-disable-next-line react/require-default-props
  otherProps?: ButtonProps;
};

const AuthButton = ({ otherProps }: AuthButtonProps) => {
  const router = useRouter();
  const { mutate, authorizedUser } = useUser();

  const handleSignOut = async () => {
    try {
      const signedOut = await fetcher("/signout");
      if (signedOut) {
        mutate(null);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!authorizedUser) {
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
