import { ChangeEvent, FormEvent, useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "../../Utils/Firebase/firebase.utils";

import FromInput from "../Form-Input/FormInput";

import toast from "react-hot-toast";

import Button from "../Button/Button";
import { SignUpContainer } from "./sign-up-form.styles";
import { useDispatch } from "react-redux";
import { emailSignUpLoading } from "../../Utils/Redux/features/user/userSlice";

export interface FormFields {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultFormFields: FormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("passwords do not match");
      return;
    }
    try {
      dispatch(emailSignUpLoading({ email, password, displayName }));
      resetFormFields();
      toast.success("Sign Up Successful");
    } catch (error: any) {
      if (error.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters");
      } else if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
      } else if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FromInput
          label="Display Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          required
        />

        <FromInput
          label="Email"
          required
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <FromInput
          label="Password"
          required
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <FromInput
          label="Confirm Password"
          required
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
