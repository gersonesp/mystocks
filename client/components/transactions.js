import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {transactions as dispatchTransactions} from '../store'

export const Transactions = props => {
  // get portfolio data from state
  const transactions = useSelector(state => state.transactions)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(dispatchTransactions(user.id))
  }, [])

  return (
    <div>
      <h3>History of Transactions</h3>
      <ul>
        {transactions.map(item => (
          <li key={item.id}>
            {item.date.split('T').shift()} BUY ({item.ticker}) - {item.quantity}{' '}
            Shares @ {item.price}
          </li>
        ))}
      </ul>
    </div>
  )
}
