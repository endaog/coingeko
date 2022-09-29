import { CoinActions } from "./coins.actionTypes"
import { CoinState } from "./coins.actions"
import { Action } from "../common/common.actions"

export const initialState: CoinState = {
  pending: false,
  coins: [],
  error: null,
}

function reducer(state = initialState, action: Action): CoinState {
  switch (action.type) {
    case CoinActions.FETCH_COIN_REQUEST:
      return {
        ...state,
        pending: true,
      }
    case CoinActions.FETCH_COIN_SUCCESS:
      return {
        ...state,
        pending: false,
        coins: action.payload.coins,
        error: null,
      }
    case CoinActions.FETCH_COIN_FAILURE:
      return {
        ...state,
        pending: false,
        coins: [],
        error: action.payload.error,
      }
    case CoinActions.FETCH_ONE_COIN_REQUEST:
      return {
        ...state,
        pending: true,
      }
    case CoinActions.FETCH_ONE_COIN_SUCCESS:
      return {
        ...state,
        pending: false,
        coinDetails: action.payload.coin,
        error: null,
      }
    case CoinActions.FETCH_ONE_COIN_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
