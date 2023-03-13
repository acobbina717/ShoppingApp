import { Button, ButtonProps } from "@mantine/core";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { GoogleIcon } from "./GoogleIcon";

interface GoogleButtonProps {
  props: ButtonProps;
  children: ReactNode;
}

export const GoogleButton = ({
  children,

  props,
}: GoogleButtonProps) => {
  const router = useRouter();
  const handleGoogleSignIn = () =>
    signIn("google", {
      callbackUrl: `/auth?callbackUrl=${router.asPath}`,
    });

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
