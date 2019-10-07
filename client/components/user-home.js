import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {stock, portfolio} from '../store'
import TickerForm from './ticker-form'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {
    id,
    firstName,
    lastName,
    balance,
    handleSearchSubmit,
    values,
    error
  } = props

  return (
    <div>
      <h3>
        Welcome, {firstName} {lastName}!
      </h3>

      <div>Cash: {balance}</div>

      <TickerForm
        onSubmit={values => {
          handleSearchSubmit(values, id)
        }}
      />

      {error && error.response && <div> {error.response.data} </div>}
    </div>
  )
}

const mapDispatchStocks = dispatch => {
  return {
    handleSearchSubmit: (value, id) => {
      dispatch(stock(value.ticker, value.quantity, id))
    }
  }
}

const mapDispatchUser = dispatch => {
  return {
    handleSubmit: id => dispatch(portfolio(id))
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    id: state.user.id,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    balance: state.user.balance,
    portfolio: state.user.portfolio
  }
}

export const UserHomeStocks = connect(mapState, mapDispatchStocks)(UserHome)
export const UserHomeUsers = connect(mapState, mapDispatchUser)(UserHome)

/**
 * PROP TYPES
 */
TickerForm.propTypes = {
  error: PropTypes.object
}
