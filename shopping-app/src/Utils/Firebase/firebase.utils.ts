import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIJv8KdmNFt-HqKunt3hDoKdMH5-LS23k",
  authDomain: "shopping-app-db-6b7f4.firebaseapp.com",
  projectId: "shopping-app-db-6b7f4",
  storageBucket: "shopping-app-db-6b7f4.appspot.com",
  messagingSenderId: "261171838189",
  appId: "1:261171838189:web:c42fc80c24c1745347a0e4",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

type UserAuth = Awaited<ReturnType<typeof signInWithGooglePopup>>;

export const createUserDocFromGoogleAuth = async ({ user }: UserAuth) => {
  const userDocRef = doc(db, "users", user.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = user;

    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  return userDocRef;
};
