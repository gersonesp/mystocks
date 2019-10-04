import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, lastName, balance} = props

  return (
    <div>
      <h3>
        Welcome, {firstName} {lastName}!
      </h3>

      <div>Balance: {balance}</div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    balance: state.user.balance
  }
}

export default connect(mapState)(UserHome)
