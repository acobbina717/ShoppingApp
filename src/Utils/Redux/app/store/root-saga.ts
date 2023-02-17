import { call, all } from "redux-saga/effects";
import { categoriesSaga } from "../../features/categories/categories.saga";
import { userSaga } from "../../features/user/userSaga";

export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSaga)]);
}
