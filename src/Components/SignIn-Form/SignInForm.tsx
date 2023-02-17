import { ChangeEvent, FormEvent, useState } from "react";

import toast from "react-hot-toast";
import Button, { BUTTON_TYPE_CLASSES } from "../Button/Button";
import FormInput from "../Form-Input/FormInput";

import { FormFields } from "../SignUp-Form/SignUpForm";
import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";
import { useAppDispatch } from "../../Utils/Redux/hooks/hooks";
import {
  googleSignInLoading,
  emailSignInLoading,
} from "../../Utils/Redux/features/user/userSlice";

type SignUpFormFields = Omit<FormFields, "displayName" | "confirmPassword">;

const defaultFormFields: SignUpFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useAppDispatch();
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
      dispatch(emailSignInLoading({ email, password }));
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
    dispatch(googleSignInLoading());
  };

  return (
    <SignInContainer>
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
        <ButtonsContainer className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
