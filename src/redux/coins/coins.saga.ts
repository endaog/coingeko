import axios, { AxiosResponse } from "axios"
import { all, call, put, takeLatest } from "redux-saga/effects"
import { CoinAction, ICoin, FetchCoinsAction, FetchOneCoinAction, ICoinDetails } from "./coins.actions"
import { CoinActions } from "./coins.actionTypes"
import { getCoins, getOneCoin } from "./services"

/*
  Fired on FETCH_COIN_REQUEST action
*/
function* fetchCoins(action: FetchCoinsAction) {
  const { payload } = action
  try {
    const response: AxiosResponse = yield call(getCoins, payload)
    if (response.status === 200) {
      const fetchCoinsResponse: ICoin[] = response.data
      yield put(CoinAction.fetchCoinsSuccess({ coins: fetchCoinsResponse }))
    } else {
      yield put(CoinAction.fetchCoinsError({ error: `Error ${response.status}` }))
    }
  } catch (error) {
    yield put(CoinAction.fetchCoinsError({ error: `Failed to fetch API response` }))
  }
}

/*
  Fired on FETCH_COIN_REQUEST action
*/
function* fetchOneCoin(action: FetchOneCoinAction) {
  const { payload } = action
  try {
    const response: AxiosResponse = yield call(getOneCoin, payload)
    if (response.status === 200) {
      // good set the return type here as it propagate up through the app
      const fetchCoinResponse: ICoinDetails = mapGetOneCoinResponceToICoin(response.data)
      yield put(CoinAction.fetchOneCoinSuccess({ coin: fetchCoinResponse }))
    } else {
      yield put(CoinAction.fetchOneCoinError({ error: `Error ${response.status}` }))
    }
  } catch (error) {
    yield put(CoinAction.fetchOneCoinError({ error: `Failed to fetch API response` }))
  }
}

// Extract mapper functions like this and export it so we can test on its own
export const mapGetOneCoinResponceToICoin = (response: any): ICoinDetails => {
  const coinData: ICoinDetails = {
    id: response.id,
    image: response.image.large,
    name: response.name,
    symbol: response.symbol,
    hashing_algorithm: response.hashing_algorithm,
    description: response.description.en,
    market_cap: response.market_data.market_cap.eur,
    homepage: response.links.homepage[0],
    genesis_date: response.genesis_date,
  }
  return coinData
}

/*
  Watcher saga on CoinActions.
*/
function* coinSaga() {
  yield all([takeLatest(CoinActions.FETCH_COIN_REQUEST, fetchCoins)])
  yield all([takeLatest(CoinActions.FETCH_ONE_COIN_REQUEST, fetchOneCoin)])
}

export default coinSaga
