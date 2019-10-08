import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {stock, portfolio as dispatchPortfolio} from '../store'
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
    portfolio,
    values,
    error
  } = props

  useEffect(() => {
    document.getElementsByTagName('h3')[0].style.color = 'red'
    dispatchPortfolio(id)
  }, [])

  console.log(portfolio)

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

      <h3>Portfolio</h3>

      {typeof portfolio !== 'undefined' &&
        portfolio &&
        portfolio.map(item => (
          <li key={item.id}>
            {item.ticker} - {item.quantity} shares
          </li>
        ))}

      {error && error.response && <div> {error.response.data} </div>}
    </div>
  )
}

const mapDispatchStocks = dispatch => {
  return {
    handleSearchSubmit: (value, id) => {
      dispatch(stock(value.ticker, value.quantity, id))
      dispatch(dispatchPortfolio(id))
    }
  }
}

const mapDispatchPortfolio = (dispatch, id) => {
  return dispatch(dispatchPortfolio(id))
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
    balance: state.user.balance
  }
}

const mapStatePortfolio = state => {
  return {
    portfolio: state.portfolio.portfolio
  }
}

export const UserHomeStocks = connect(mapState, mapDispatchStocks)(UserHome)
export const UserHomePortfolio = connect(
  mapStatePortfolio,
  mapDispatchPortfolio
)(UserHome)

/**
 * PROP TYPES
 */
TickerForm.propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.object
}
