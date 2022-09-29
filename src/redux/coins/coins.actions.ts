import { CoinActions } from "./coins.actionTypes"

export interface ICoin {
  id: string
  image: string
  name: string
  symbol: string
  current_price: string
  high_24h: number
  low_24h: number
}

export interface ICoinDetails {
  id: string
  image: string
  name: string
  symbol: string
  hashing_algorithm: string
  description: string
  market_cap: string
  homepage: string
  genesis_date: string
}

export interface CoinState {
  pending: boolean
  coins: ICoin[]
  error: string | null
  coinDetails?: ICoinDetails
}

// Fetch ALL
export interface FetchCoinsAction {
  type: typeof CoinActions.FETCH_COIN_REQUEST
  payload: FetchCoinsActionPayload
}

export interface FetchCoinsActionPayload {
  start: number
  limit: number
  orderBy: string
  currency: string
}

export interface FetchCoinsSuccessAction {
  type: typeof CoinActions.FETCH_COIN_SUCCESS
  payload: FetchCoinsSuccessActionPayload
}

export interface FetchCoinsSuccessActionPayload {
  coins: ICoin[]
}

export interface FetchCoinsErrorAction {
  type: typeof CoinActions.FETCH_COIN_FAILURE
  payload: FetchCoinsErrorActionPayload
}

export interface FetchCoinsErrorActionPayload {
  error: string
}

// Fetch One
export interface FetchOneCoinAction {
  type: typeof CoinActions.FETCH_ONE_COIN_REQUEST
  payload: FetchOneCoinActionPayload
}

export interface FetchOneCoinActionPayload {
  coinId: string
}

export interface FetchOneCoinSuccessAction {
  type: typeof CoinActions.FETCH_ONE_COIN_SUCCESS
  payload: FetchOneCoinSuccessActionPayload
}

export interface FetchOneCoinSuccessActionPayload {
  coin: ICoinDetails
}

export interface FetchOneCoinErrorAction {
  type: typeof CoinActions.FETCH_ONE_COIN_FAILURE
  payload: FetchOneCoinErrorActionPayload
}

export interface FetchOneCoinErrorActionPayload {
  error: string
}

// Actions
const CoinAction = {
  fetchCoins(payload: FetchCoinsActionPayload): FetchCoinsAction {
    return {
      type: CoinActions.FETCH_COIN_REQUEST,
      payload,
    }
  },
  fetchCoinsSuccess(payload: FetchCoinsSuccessActionPayload): FetchCoinsSuccessAction {
    return {
      type: CoinActions.FETCH_COIN_SUCCESS,
      payload,
    }
  },
  fetchCoinsError(payload: FetchCoinsErrorActionPayload): FetchCoinsErrorAction {
    return {
      type: CoinActions.FETCH_COIN_FAILURE,
      payload,
    }
  },
  fetchOneCoin(payload: FetchOneCoinActionPayload): FetchOneCoinAction {
    return {
      type: CoinActions.FETCH_ONE_COIN_REQUEST,
      payload,
    }
  },
  fetchOneCoinSuccess(payload: FetchOneCoinSuccessActionPayload): FetchOneCoinSuccessAction {
    return {
      type: CoinActions.FETCH_ONE_COIN_SUCCESS,
      payload,
    }
  },
  fetchOneCoinError(payload: FetchOneCoinErrorActionPayload): FetchOneCoinErrorAction {
    return {
      type: CoinActions.FETCH_ONE_COIN_FAILURE,
      payload,
    }
  },
}

export { CoinAction }
