import { initializeApp } from "firebase/app";
import {
  signOut,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  UserCredential,
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

export const db = getFirestore();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const createUserDocFromGoogleAuth = async (
  user: User,
  additionInfomation = {}
) => {
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionInfomation,
      });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

type UserAuthState = (user: User | null) => void;

export const onAuthStateChangeListener = (callback: UserAuthState) =>
  onAuthStateChanged(auth, callback);
