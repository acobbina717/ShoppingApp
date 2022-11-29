import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

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
  middleware: [logger],
});

export const persistor = persistStore(store);
