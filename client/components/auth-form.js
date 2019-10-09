import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name} className="authForm">
        <div className="signupForm">
          {/* If form name is 'sign up' render signup inputs */}
          {name === 'signup' ? (
            <div>
              <label htmlFor="firstName">
                <p>First Name</p>
              </label>
              <input name="firstName" type="text" />

              <label htmlFor="lastName">
                <p>Last Name</p>
              </label>
              <input name="lastName" type="text" />

              <label htmlFor="email">
                <p>Email</p>
              </label>
              <input name="email" type="text" />

              <label htmlFor="password">
                <p>Password</p>
              </label>
              <input name="password" type="password" />

              <button type="submit">{displayName}</button>
              <div className="loginContainer">
                Already a member?
                <Link className="login" to="/login">
                  Login here.
                </Link>
              </div>
            </div>
          ) : (
            <div className="loginForm">
              {/* Else render the login inputs */}
              <label htmlFor="email">
                <p>Email</p>
              </label>
              <input name="email" type="text" />

              <label htmlFor="password">
                <p>Password</p>
              </label>
              <input name="password" type="password" />

              <div>
                <div>
                  <button type="submit">{displayName}</button>
                </div>
                <div>
                  <a className="googleLogin" href="/auth/google">
                    {displayName} with Google
                  </a>
                </div>
                <div className="signupContainer">
                  New member?
                  <Link className="signup" to="/signup">
                    Sign Up here.
                  </Link>
                </div>
              </div>
              {error &&
                error.response && (
                  <div style={{color: 'white'}}> {error.response.data} </div>
                )}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatchSignup = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName, firstName, lastName))
    }
  }
}

const mapDispatchLogin = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}
export const authForm = connect(mapState, null)(AuthForm)
export const Login = connect(mapLogin, mapDispatchLogin)(AuthForm)
export const Signup = connect(mapSignup, mapDispatchSignup)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
