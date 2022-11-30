import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: process.env.NODE_ENV === "development" && logger ? [logger] : [],
});

export const persistor = persistStore(store);
