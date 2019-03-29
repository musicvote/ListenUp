import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Image, Button, Grid, Segment} from 'semantic-ui-react'

// COMPONENT Keep!
const AuthForm = props => {
  const {displayName} = props

  return (
    <div>
      <h1 className="welcome-message">Welcome to ListenUp</h1>
      <div className="logo">
        <Image src="listen_up_logo.png" />
      </div>
      <div className="login-button">
        <Grid.Column textAlign="center">
          <Button size="massive">
            <a href="/auth/spotify">{displayName} with spotify</a>
          </Button>
        </Grid.Column>
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
