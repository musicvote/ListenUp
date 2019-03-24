import React from 'react'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = ({user}) => {
  return (
    <div>
      <h3>{`Welcome ${user.spotifyUsername}`} </h3>
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
    user: state.user.user
  }
}

export default connect(mapState)(UserHome)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
