import { all, fork } from "redux-saga/effects"

import coinsSaga from "../redux/coins/coins.saga"

export function* rootSaga() {
  yield all([fork(coinsSaga)])
}
