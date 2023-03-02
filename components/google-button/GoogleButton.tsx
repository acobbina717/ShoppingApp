import { Button, ButtonProps } from "@mantine/core";
import { ReactNode } from "react";
import { GoogleIcon } from "./GoogleIcon";

interface GoogleButtonProps {
  clickHandler: () => void;
  props: ButtonProps;
  children: ReactNode;
}

export const GoogleButton = ({
  children,
  clickHandler,
  props,
}: GoogleButtonProps) => {
  return (
    <Button
      onClick={clickHandler}
      leftIcon={<GoogleIcon />}
      variant="default"
      color="gray"
      {...props}
    >
      {children}
    </Button>
  );
};
