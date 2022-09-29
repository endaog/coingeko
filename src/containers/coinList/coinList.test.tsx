import React from "react"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { CoinList } from "."
import { BrowserRouter } from "react-router-dom"
import store from "../../store"

const spyScrollTo = jest.fn()

describe("Coin list", () => {
  beforeEach(() => {
    Object.defineProperty(global.window, "scrollTo", { value: spyScrollTo })
    spyScrollTo.mockClear()
  })

  test("renders the loader when no content exists", () => {
    const testStore = store
    const { asFragment, getByText } = render(
      <Provider store={testStore}>
        <BrowserRouter>
          <CoinList />
        </BrowserRouter>
      </Provider>
    )
    // Check loading message present
    expect(getByText(/Loading.../i)).toBeInTheDocument()

    // Take a snapshot for regressions
    expect(asFragment()).toMatchSnapshot()

    // Scroll to top
    expect(spyScrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  })
})
