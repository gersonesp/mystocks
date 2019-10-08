import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {portfolio as portfolioThunk} from '../store'

export const Transactions = props => {
  // get portfolio data from state
  const portfolio = useSelector(state => state.portfolio)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(portfolioThunk(user.id))
  }, [])

  return (
    <div>
      <h3>History of Transactions</h3>
      <ul>
        {portfolio.map(item => (
          <li key={item.id}>
            {item.ticker} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  )
}
