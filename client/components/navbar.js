import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({isLoggedIn, handleClick}) => {
  return (
    <div>
      <nav className="nav animated fadeIn delay-.5s">
        {isLoggedIn.id ? (
          <div>
            <h1 className="center">ListenUp</h1>
            {/* The navbar will show these links after you log in */}
            <div className="nav-links">
              <Link to="/home">Home</Link>
              <Link to="/playlist/6UOF0Hq6ffLXnADFQxVKUH">Playlist</Link>
              <a href="/" onClick={handleClick}>
                Logout
              </a>
            </div>
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
