import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import {
  signInAuthUserWithEmailAndPassword,
  createUserDocFromGoogleAuth,
  signInWithGooglePopup,
} from "../../Utils/Firebase/firebase.utils";
import Button from "../Button/Button";
import FormInput from "../Form-Input/FormInput";
import { FormFields } from "../SignUp-Form/SignUpForm";

import "./sign-in-form.styles.scss";

type SignInFormProps = {};

type SignUpFormFields = Omit<FormFields, "displayName" | "confirmPassword">;

const defaultFormFields: SignUpFormFields = {
  email: "",
  password: "",
};

const SignInForm = (props: SignInFormProps) => {
  const [formFields, setFormFields] =
    useState<SignUpFormFields>(defaultFormFields);

  const { email, password } = formFields;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) return;
    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);

      // if (response) await createUserDocFromGoogleAuth(response);

      resetFormFields();

      toast.success("Sign in successful");
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          toast.error("Incorrect email or password");
          break;
        case "auth/user-not-found":
          toast.error("No user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithGooglePopup();

      if (response) await createUserDocFromGoogleAuth(response);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={handleSubmit}>
        <h2>I already have an account</h2>

        <span>Sign in with your email and password</span>

        <FormInput
          required
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          required
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;