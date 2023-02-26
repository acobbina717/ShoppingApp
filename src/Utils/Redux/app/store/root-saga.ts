import { call, all } from "redux-saga/effects";

import { userSaga } from "../../features/user/userSaga";

export function* rootSaga() {
  yield all([call(userSaga)]);
}
