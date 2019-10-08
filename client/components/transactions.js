import React from 'react'
import {connect} from 'react-redux'

export const Transactions = () => {
  return (
    <div>
      <h3>History of Transactions</h3>
    </div>
  )
}

const mapState = state => {
  return {
    id: state.user.id,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    balance: state.user.balance,
    portfolio: state.portfolio
  }
}

export default connect(mapState, null)(Transactions)
