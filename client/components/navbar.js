import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Searchbar from './Searchbar'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="navbar">
    <h1>Music Vote:Democrotizing your music listening experience</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/playlist">Playlist</Link>

          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>{/* <a href="/callback">{displayName} with Spotify</a> */}</div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
