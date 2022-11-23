import {
  signInWithGooglePopup,
  createUserDocFromGoogleAuth,
} from "../../Utils/Firebase/firebase.utils";
type SignInProps = {};

const SignIn = (props: SignInProps) => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    createUserDocFromGoogleAuth(response);
  };
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
