import SignInForm from "../../Components/SignIn-Form/SignInForm";
import SignUpForm from "../../Components/SignUp-Form/SignUpForm";
import { AuthContainer } from "./auth.styles";

const Auth = () => {
  return (
    <AuthContainer>
      <SignInForm />
      <SignUpForm />
    </AuthContainer>
  );
};

export default Auth;
