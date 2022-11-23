import SignUpForm from "../../Components/Sign-Up-Form/SignUpForm";
import {
  signInWithGooglePopup,
  createUserDocFromGoogleAuth,
} from "../../Utils/Firebase/firebase.utils";
type SignInProps = {};

const SignIn = (props: SignInProps) => {
  const logGooglePopupUser = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromGoogleAuth(response);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGooglePopupUser}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
