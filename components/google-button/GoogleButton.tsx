import { Button, ButtonProps } from "@mantine/core";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";
import { GoogleIcon } from "./GoogleIcon";

interface GoogleButtonProps {
  props: ButtonProps;
  children: ReactNode;
}

export const GoogleButton = ({
  children,

  props,
}: GoogleButtonProps) => {
  const handleGoogleSignIn = () => signIn("google", {});

  return (
    <Button
      onClick={handleGoogleSignIn}
      leftIcon={<GoogleIcon />}
      variant="default"
      color="gray"
      {...props}
    >
      {children}
    </Button>
  );
};
