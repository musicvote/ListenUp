import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Container} from 'semantic-ui-react'

const Navbar = ({isLoggedIn, handleClick}) => {
  console.log('logged in ', isLoggedIn)
  return (
    <div>
      <nav>
        {isLoggedIn.id ? (
          <div>
            <h1>Music Vote: Democrotizing your music listening experience</h1>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/playlist">Playlist</Link>
            <a href="/" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : null}
      </nav>
    </div>
  )
}
//Container
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
