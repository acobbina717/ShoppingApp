import SignInForm from "../../Components/SignIn-Form/SignInForm";
import SignUpForm from "../../Components/SignUp-Form/SignUpForm";
import "./auth.styles.scss";
type AuthProps = {};

const Auth = (props: AuthProps) => {
  return (
    <div className="auth-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Auth;
