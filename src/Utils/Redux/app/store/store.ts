import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const middleWares =
  process.env.NODE_ENV !== "production" && logger
    ? [thunk, sagaMiddleware, logger]
    : [thunk, sagaMiddleware];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleWares,
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persister = persistStore(store);
