import { Button, ButtonProps } from "@mantine/core";
import Link from "next/link";
import { useUser } from "../utils/hooks";

type AuthButtonProps = {
  // eslint-disable-next-line react/require-default-props
  otherProps?: ButtonProps;
};

const AuthButton = ({ otherProps }: AuthButtonProps) => {
  const { currentUser } = useUser();
  const handleSignOut = () => {};

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
