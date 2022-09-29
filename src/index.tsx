import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { HashRouter, Route, Routes } from "react-router-dom"
import "./index.css"
import store from "./store"
import { CoinList } from "./containers/coinList"
import { CoinDetails } from "./containers/details"
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<CoinList />} />
          <Route path="/details/:id" element={<CoinDetails />} />
        </Routes>
      </HashRouter>
    </Provider>
  </>
)

// reportWebVitals(console.log);
