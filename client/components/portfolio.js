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
    <div>
      {typeof portfolioData !== 'undefined' &&
        portfolioData && (
          <div>
            <h3>Your Portfolio</h3>

            {portfolioData.map(item => (
              <li key={item.id}>
                {item.ticker} - {item.quantity} shares
              </li>
            ))}
          </div>
        )}
    </div>
  )
}
