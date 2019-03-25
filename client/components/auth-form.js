import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
//import {Button} from 'semantic-ui-react'

// COMPONENT Keep!
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} name={name}>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/spotify">{displayName} with spotify</a>
      </div>
    </div>
  )
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

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
