import { ReactNode } from "react";
import { BaseButton, GoogleSignIn, InvertedButton } from "./button.styles";

type ButtonProps = {
  children: ReactNode;
  buttonType?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
};

type ButtonTypes = "base" | "google" | "inverted";
type ButtonClasses = Record<ButtonTypes, string>;

export const BUTTON_TYPE_CLASSES: ButtonClasses = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignIn,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }: ButtonProps) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton
      className={`button-container ${
        BUTTON_TYPE_CLASSES[buttonType as keyof ButtonClasses]
      }`}
      {...otherProps}
    >
      {children}
    </CustomButton>
  );
};

export default Button;
