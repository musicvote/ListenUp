import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import {Button} from 'semantic-ui-react'

// COMPONENT Keep!
const AuthForm = props => {
  const {displayName} = props

  return (
    <div>
      <h1 className="welcome-message">ListenUp</h1>
      <div className="container">
        <div className="animated jackInTheBox delay-.5s">
          <img id="logo" src="./listen_up_logo.png" />
          <div className="login-button">
            <Button size="massive">
              <a href="/auth/spotify">{displayName} with spotify</a>
            </Button>
          </div>
        </div>
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
