import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Navbar from './navbar'
import {Button} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {id} = props

  return (
    <div>
      <h1>Music Vote: Democrotizing your music listening experience</h1>
      <Navbar />
      <h3>{`Welcome, ${id}`}</h3>
      <Button size="massive">
        <a href="/create"> Create Playlist</a>
      </Button>
      <br />
      <br />
      <Button size="massive">
        <a href="/join"> Join Playlist</a>
      </Button>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user.id
  }
}

export default connect(mapState)(UserHome)
