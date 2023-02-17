import SignInForm from "../../components/SignIn-Form/SignInForm";
import SignUpForm from "../../components/SignUp-Form/SignUpForm";
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
