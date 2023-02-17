import { PayloadAction } from "@reduxjs/toolkit";
import { User, UserCredential } from "firebase/auth";
import { DocumentSnapshot } from "firebase/firestore";

import {
  put,
  all,
  call,
  PutEffect,
  takeLatest,
  CallEffect,
  ForkEffect,
} from "redux-saga/effects";

import {
  getCurrentUser,
  createUserDocFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
  createAuthUserWithEmailAndPassword,
} from "../../../Firebase/firebase.utils";

import {
  UserDocumentSnapshot,
  signInFulfilled,
  signInRejected,
  EmailProps,
  emailSignUpRejected,
  emailSignUpFulfilled,
  SignUpSuccessProps,
  signOutFulfilled,
  signOutRejected,
} from "./userSlice";

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionInfomation?: any
): Generator<
  | PutEffect<{
      type: "user/signInRejected";
      payload: Error;
    }>
  | PutEffect<{
      payload: UserDocumentSnapshot | null;
      type: "user/signInFulfilled";
    }>
  | CallEffect<DocumentSnapshot<UserDocumentSnapshot> | undefined>,
  void,
  UserDocumentSnapshot
> {
  try {
    const userSnapshot = yield call(
      createUserDocFromAuth,
      userAuth,
      additionInfomation
    );

    yield put(signInFulfilled({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    if (error instanceof Error) yield put(signInRejected(error));
  }
}

export function* isUserAuthenticated(): Generator<
  | PutEffect<{
      type: "user/signInRejected";
      payload: Error;
    }>
  | CallEffect<typeof getSnapshotFromUserAuth>
  | CallEffect<unknown>,
  void,
  User
> {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth, {});
  } catch (error) {
    if (error instanceof Error) yield put(signInRejected(error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: PayloadAction<EmailProps>) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    if (error instanceof Error) yield put(signInRejected(error));
  }
}

export function* signUpWithEmail({
  payload: { email, password, displayName },
}: PayloadAction<EmailProps>): Generator<
  | PutEffect<{
      type: "user/emailSignUpFulfilled";
      payload: SignUpSuccessProps;
    }>
  | PutEffect<{
      type: "user/emailSignUpRejected";
      payload: Error;
    }>
  | CallEffect<UserCredential | undefined>,
  void,
  UserCredential
> {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(emailSignUpFulfilled({ user, displayName }));
  } catch (error) {
    if (error instanceof Error) yield put(emailSignUpRejected(error));
  }
}

export function* signInAfterSignUp({
  payload: { user, displayName },
}: PayloadAction<{ user: User; displayName: string }>) {
  yield call(getSnapshotFromUserAuth, user, { displayName });
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    if (error instanceof Error) yield put(signInRejected(error));
  }
}

export function* userSignOut() {
  try {
    yield signOutUser();
    yield put(signOutFulfilled());
  } catch (error) {
    if (error instanceof Error) yield put(signOutRejected(error));
  }
}

export function* onCheckUserSession(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest("user/checkUserSession", isUserAuthenticated);
}

export function* onGoogleSignin() {
  yield takeLatest("user/googleSignInLoading", signInWithGoogle);
}

export function* onEmailSignin() {
  yield takeLatest("user/emailSignInLoading", signInWithEmail);
}

export function* onEmailSignUp() {
  yield takeLatest("user/emailSignUpLoading", signUpWithEmail);
}

export function* onSignOut() {
  yield takeLatest("user/signOutLoading", userSignOut);
}

export function* onSuccessfulSignUp() {
  yield takeLatest("user/emailSignUpFulfilled", signInAfterSignUp);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignin),
    call(onEmailSignin),
    call(onEmailSignUp),
    call(onSuccessfulSignUp),
    call(onSignOut),
  ]);
}
