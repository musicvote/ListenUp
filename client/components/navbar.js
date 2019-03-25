import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Searchbar from './Searchbar'

const Navbar = ({isLoggedIn, handleClick}) => {
  // console.log('isLoggedIn ', isLoggedIn)
  return (
    <div id="navbar">
      <h1>Music Vote:Democrotizing your music listening experience</h1>
      <nav>
        {isLoggedIn.id ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/playlist">Playlist</Link>

            <a href="/" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>Please click below to log in with Spotify.</div>
        )}
      </nav>
      <hr />
    </div>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
