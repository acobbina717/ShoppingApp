import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const isProduction = process.env.NODE_ENV !== "production";

const sagaMiddleware = createSagaMiddleware();

const middleWares =
  isProduction && logger
    ? [thunk, sagaMiddleware, logger]
    : [thunk, sagaMiddleware];

const devToolsOptions = isProduction ? true : false;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleWares,
  devTools: devToolsOptions,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
