import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
// import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

let middleWares =
  process.env.NODE_ENV !== "production" && logger ? [thunk, logger] : [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleWares,
  devTools: true,
});

export const persistor = persistStore(store);
