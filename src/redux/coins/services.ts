import { FetchCoinsActionPayload, FetchOneCoinActionPayload } from "./coins.actions"
import axios, { AxiosResponse } from "axios"

// Service calls
export const getCoins = (payload: FetchCoinsActionPayload) => {
  return axios.get<AxiosResponse>(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${payload.currency}&order=${payload.orderBy}&per_page=${payload.limit}&page=${payload.start}&sparkline=false`
  )
}

export const getOneCoin = (payload: FetchOneCoinActionPayload) => {
  return axios.get<AxiosResponse>(`https://api.coingecko.com/api/v3/coins/${payload.coinId}`)
}
