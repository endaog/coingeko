import "./index.css"
import { useParams, Link } from "react-router-dom"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CoinAction } from "../../redux/coins/coins.actions"
import { getCoinDetailsSelector, getPendingSelector, getErrorSelector } from "../../redux/coins/coins.selectors"
import ReactHtmlParser from "react-html-parser"

export const CoinDetails = () => {
  let params = useParams()
  const dispatch = useDispatch()
  const pending = useSelector(getPendingSelector)
  const error = useSelector(getErrorSelector)
  const coinDetails = useSelector(getCoinDetailsSelector)

  useEffect(() => {
    if (params.id) {
      dispatch(CoinAction.fetchOneCoin({ coinId: params.id }))
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="main__container">
      {pending ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        coinDetails && (
          <div>
            <div className="coin_image">
              <img src={coinDetails.image} alt={coinDetails.id} />
            </div>
            <div className="coin_title_wrapper">
              <h1 className="coin__title">{coinDetails.id}</h1>
              <div className="coin_symbol">{coinDetails.symbol}</div>
            </div>
            <div className="coin_description">{ReactHtmlParser(coinDetails.description)}</div>
            {coinDetails.hashing_algorithm && (
              <div className="coin_info">
                Hashing algorithm: <span>{coinDetails.hashing_algorithm}</span>
              </div>
            )}
            {coinDetails.market_cap && (
              <div className="coin_info">
                Market cap: <span>{coinDetails.market_cap}</span>
              </div>
            )}
            {coinDetails.homepage && (
              <div className="coin_info">
                Homepage: <span>{coinDetails.homepage}</span>
              </div>
            )}
            {coinDetails.genesis_date && (
              <div className="coin_info">
                Genesis Date: <span>{coinDetails.genesis_date}</span>
              </div>
            )}
            <div className="coin_info_footer">
              <Link to="/">Back</Link>
            </div>
          </div>
        )
      )}
    </section>
  )
}
