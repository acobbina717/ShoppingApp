import { ReactNode } from "react";
import "./button.styles.scss";

type ButtonProps = {
  children: ReactNode;
  buttonType?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
};

type ButtonTypes = "google" | "inverted";
type ButtonClasses = Record<ButtonTypes, string>;
const BUTTON_TYPE_CLASSES: ButtonClasses = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }: ButtonProps) => {
  return (
    <button
      className={`button-container ${
        BUTTON_TYPE_CLASSES[buttonType as keyof ButtonClasses]
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
