import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { StatusState } from "../categories/categoriesSlice";
import { DocumentData } from "firebase/firestore";
import { User } from "firebase/auth";

export interface UserDocumentSnapshot extends DocumentData {
  id?: string;
}

export interface SignUpSuccessProps {
  user: User;
  displayName?: string;
}

export interface UserState {
  currentUser: UserDocumentSnapshot | null;
  status: StatusState;
  error: null | Error;
}

const initialState: UserState = {
  currentUser: null,
  status: "idle",
  error: null,
};

export interface EmailProps {
  email: string;
  password: string;
  displayName?: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    emailSignInLoading(state) {
      state.status = "loading";
    },
    signInFulfilled(
      state,
      { payload }: PayloadAction<UserDocumentSnapshot | null>
    ) {
      state.status = "success";
      state.currentUser = payload;
    },
    signInRejected(state, { payload }) {
      state.status = "failed";
      state.error = payload;
    },
    checkUserSession(state) {
      state.status = "loading";
    },
    googleSignInLoading(state) {
      state.status = "loading";
    },
    signOutLoading(state) {
      state.status = "loading";
    },
    signOutFulfilled(state) {
      state.status = "success";
      state.currentUser = null;
    },
    signOutRejected(state, { payload }: PayloadAction<Error>) {
      state.status = "failed";
      state.error = payload;
    },
    emailSignUpLoading(state) {
      state.status = "loading";
    },
    emailSignUpFulfilled(
      state,
      { payload }: PayloadAction<SignUpSuccessProps>
    ) {
      state.status = "success";
      state.currentUser = payload;
    },
    emailSignUpRejected(state, { payload }: PayloadAction<Error>) {
      state.status = "failed";
      state.error = payload;
    },
  },
});

export const {
  signOutLoading,
  signOutFulfilled,
  signOutRejected,
  signInRejected,
  signInFulfilled,
  checkUserSession,
  emailSignInLoading,
  googleSignInLoading,
  emailSignUpLoading,
  emailSignUpFulfilled,
  emailSignUpRejected,
} = userSlice.actions;

export default userSlice.reducer;
