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
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  // writeBatch,
  query,
  getDocs,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

// import SHOP_DATA from "../../shop-data";
import { Product } from "../redux/features/categories/categoriesSlice";

export interface ShopDataCollection {
  title: string;
  items: Array<Product>;
}

// eslint-disable-next-line no-unused-vars
type UserAuthState = (user: User | null) => void;

const firebaseConfig = {
  apiKey: "AIzaSyCIJv8KdmNFt-HqKunt3hDoKdMH5-LS23k",
  authDomain: "shopping-app-db-6b7f4.firebaseapp.com",
  projectId: "shopping-app-db-6b7f4",
  storageBucket: "shopping-app-db-6b7f4.appspot.com",
  messagingSenderId: "261171838189",
  appId: "1:261171838189:web:c42fc80c24c1745347a0e4",
};
// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();

// Add collection and  documents to Firebase DB
// const addCollectionAndDocuments = async (
//   collectionKey: string,
//   objectsToAdd: Array<ShopDataCollection>
// ) => {
//   const collectionRef = collection(db, collectionKey);

//   const batch = writeBatch(db);

//   objectsToAdd.forEach((object) => {
//     const docRef = doc(collectionRef, object.title.toLowerCase());
//     batch.set(docRef, object);
//   });

//   await batch.commit();
// };

// addCollectionAndDocuments("categories", SHOP_DATA);

interface CategoriesCollection {
  title?: any;
  [key: string]: Array<Product>;
}

export const getCategoriesAndDocuments = async (path: string) => {
  const collectionRef = collection(db, path);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce(
    (acc: CategoriesCollection, docSnapshot) => {
      const { items, title } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    },
    {}
  );

  return categoryMap;
};

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const createUserDocFromAuth = async (
  user: User,
  additionInformation = {}
): Promise<DocumentSnapshot<DocumentData> | undefined> => {
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
        ...additionInformation,
      });
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }
  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangeListener = (callback: UserAuthState) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
