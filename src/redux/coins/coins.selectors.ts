import { createSelector } from "reselect"

import { AppState } from "../../store/rootReducer"

const getPending = (state: AppState) => state.coins.pending

const getCoins = (state: AppState) => state.coins.coins

const getError = (state: AppState) => state.coins.error

const getCoinDetails = (state: AppState) => state.coins.coinDetails

export const getCoinsSelector = createSelector(getCoins, (coins) => coins)

export const getPendingSelector = createSelector(getPending, (pending) => pending)

export const getErrorSelector = createSelector(getError, (error) => error)

export const getCoinDetailsSelector = createSelector(getCoinDetails, (coinDetails) => coinDetails)
