import { combineReducers } from "redux"

import coinsReducer from "../redux/coins/coins.reducer"

const rootReducer = combineReducers({
  coins: coinsReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
