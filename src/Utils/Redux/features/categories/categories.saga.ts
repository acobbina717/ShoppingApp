import { takeLatest, all, call, put, StrictEffect } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../../Firebase/firebase.utils";
import {
  fetchCategoriesFulfilled,
  fetchCategoriesRejected,
} from "./categoriesSlice";

export function* fetchCategoriesAsync(): Generator<StrictEffect> {
  try {
    const categoriesMap = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesFulfilled(categoriesMap));
  } catch (error: any) {
    yield put(fetchCategoriesRejected(error));
  }
}

export function* onFetchCategries() {
  yield takeLatest("categories/fetchCategoriesLoading", fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategries)]);
}
