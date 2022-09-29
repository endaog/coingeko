import "./index.css"
import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPendingSelector, getCoinsSelector, getErrorSelector } from "../../redux/coins/coins.selectors"
import { CoinAction } from "../../redux/coins/coins.actions"
import { useNavigate } from "react-router-dom"

export const CoinList = () => {
  const dispatch = useDispatch();
  const pending = useSelector(getPendingSelector);
  const coins = useSelector(getCoinsSelector);
  const error = useSelector(getErrorSelector);
  let navigate = useNavigate();
  

  useEffect(() => {
    dispatch(
      CoinAction.fetchCoins({
        start: 0,
        limit: 10,
        orderBy: "market_cap_desc",
        currency: "eur",
      })
    )
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRowClick = useRef((id: string) => {
    navigate(`/details/${id}`)
    return
  })

  return (
    <section className="main__container">
      <>
        {pending ? (
          <div className="loader">Loading...</div>
        ) : error ? (
          <div>Error</div>
        ) : (
          <table>
            <caption>Top 10 coins</caption>
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Symbol</th>
                <th scope="col">24hr High</th>
                <th scope="col">24hr Low</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <tr key={coin.id} onClick={() => handleRowClick.current(coin.id)} role="button">
                  <td data-label="image">
                    <img src={coin.image} alt={coin.name} />
                  </td>
                  <td data-label="name">{coin.name}</td>
                  <td data-label="symbol">{coin.symbol}</td>
                  <td data-label="high_24h">{coin.high_24h}</td>
                  <td data-label="low_24h">{coin.low_24h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    </section>
  )
}
