import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {portfolio} from '../store'

export const Portfolio = props => {
  // get portfolio data from state
  const portfolioData = useSelector(state => state.portfolio)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(portfolio(user.id))
  }, [])

  return (
    <div className="portfolio">
      <h3>Your Portfolio</h3>
      <ul>
        {portfolioData.map(item => (
          <li key={item.id}>
            {item.ticker.toUpperCase()} - {item.quantity} shares
          </li>
        ))}
      </ul>
    </div>
  )
}
