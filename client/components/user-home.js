import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import {stock, portfolio as dispatchPortfolio} from '../store'
import TickerForm from './ticker-form'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const stocks = useSelector(state => state.stocks)

  const handleSearchSubmit = (value, id) => {
    dispatch(stock(value.ticker, value.quantity, id))
  }

  useEffect(() => {
    dispatch(dispatchPortfolio(user.id))
    //TODO add portfolio in array below (second argument for useEffect) to active rerender on change
  }, [])

  return (
    <div>
      <h3>
        Welcome, {user.firstName} {user.lastName}!
      </h3>

      <div>Cash: ${user.balance}</div>

      <TickerForm
        onSubmit={values => {
          handleSearchSubmit(values, user.id, stocks.close)
        }}
      />

      {stocks.error !== 'undefined' &&
        stocks.error && <div>{stocks.error}</div>}
      {stocks.success !== 'undefined' &&
        stocks.success && <div>{stocks.success}</div>}

      {user.error &&
        user.error.response && <div> {user.error.response.data} </div>}
    </div>
  )
}

export default UserHome

/**
 * PROP TYPES
 */
TickerForm.propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.object
}
