import coinSaga, { mapGetOneCoinResponceToICoin } from "./coins.saga"
import { expectSaga } from "redux-saga-test-plan"
import { CoinActions } from "./coins.actionTypes"
import { call } from "redux-saga-test-plan/matchers"
import { dynamic } from "redux-saga-test-plan/providers"
import { getCoins } from "./services"
import { apiData } from "./__fixtures__"

const sampleResponse = () => {
  return {
    status: 200,
    data: [
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        current_price: "20004",
        high_24h: 12,
        low_24h: 10,
      },
    ],
  }
}

describe("CoinList Saga", () => {
  test("success from api ", () => {
    return expectSaga(coinSaga)
      .provide([[call.fn(getCoins), dynamic(sampleResponse)]])
      .put({
        type: CoinActions.FETCH_COIN_SUCCESS,
        payload: {
          coins: [
            {
              id: "bitcoin",
              symbol: "btc",
              name: "Bitcoin",
              image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
              current_price: "20004",
              high_24h: 12,
              low_24h: 10,
            },
          ],
        },
      })
      .dispatch({
        type: CoinActions.FETCH_COIN_REQUEST,
        payload: {
          start: 1,
          limit: 10,
          orderBy: "ORDER",
          currency: "EUR",
        },
      })
      .silentRun()
  })

  // Test the Error case - mock api error and check the error action is created
  test("Error from api ", () => {
    return expectSaga(coinSaga)
      .provide([[call.fn(getCoins), { status: 500 }]])
      .put({
        type: CoinActions.FETCH_COIN_FAILURE,
        payload: {
          error: "Error 500",
        },
      })
      .dispatch({
        type: CoinActions.FETCH_COIN_REQUEST,
        payload: {
          start: 1,
          limit: 10,
          orderBy: "ORDER",
          currency: "EUR",
        },
      })
      .silentRun()
  })

  // Test the mapper function
  test("Mapper function that ", () => {
    const mockApiData = apiData; // Large mock files should be placed in a fixtures folder so doesnt confuse the real test
    const result = mapGetOneCoinResponceToICoin(apiData)
    const expected = {
      description: "desc",
      genesis_date: "2009-01-03",
      hashing_algorithm: "SHA-256",
      homepage: "http://www.bitcoin.org",
      id: "bitcoin",
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
      market_cap: 384357631937,
      name: "Bitcoin",
      symbol: "btc",
    }
    expect(result).toEqual(expected)
  })
})
