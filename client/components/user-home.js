import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import {stock, portfolio as dispatchPortfolio} from '../store'
import TickerForm from './ticker-form'

export const UserHome = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const stocks = useSelector(state => state.stocks)

  const handleSearchSubmit = (value, id) => {
    dispatch(stock(value.ticker, value.quantity, id))
  }

  return (
    <div className="userHome">
      <h3>
        Welcome, {user.firstName} {user.lastName}!
      </h3>

      <div className="cash">
        <strong>${user.balance}</strong>
      </div>

      <small>
        <em>Refresh page after a purchase to see updated balance.</em>
      </small>

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
