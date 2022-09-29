import coinsReducer, { initialState } from "./coins.reducer"
import { CoinAction } from "./coins.actions"

describe("Coin List Reducer", () => {
  beforeEach(() => {})

  // Test we have an initial state
  test("should have an initial State", () => {
    const state = coinsReducer(undefined as any, { type: "@@TEST" })
    expect(state).toEqual(initialState)
  })

  // Test reducer functions using the Actions so we are testing both the actions with the reducer
  test("fetchCoins sets the pending to true", () => {
    const action = CoinAction.fetchCoins({ start: 1, limit: 10, orderBy: "ORDER", currency: "EUR" })

    const expectedState = {
      pending: true,
      coins: [],
      error: null,
    }

    const result = coinsReducer(initialState, action)
    expect(result).toEqual(expectedState)
  })

  // Mock api response and ensure its stored correctly in the store.
  test("fetchCoinsSuccess stores the payload from the API", () => {
    const coins = [
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        current_price: "20004",
        high_24h: 12,
        low_24h: 10,
      },
    ]

    const action = CoinAction.fetchCoinsSuccess({ coins })

    const expectedState = {
      pending: false,
      coins: coins,
      error: null,
    }

    const result = coinsReducer(initialState, action)
    expect(result).toEqual(expectedState)
  })
})
