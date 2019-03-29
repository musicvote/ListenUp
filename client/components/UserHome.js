import React from 'react'
import {Button, Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'

export const UserHome = ({user}) => {
  return (
    <div className="userHome-page">
      <h3>{`Welcome Jennifer`} </h3>
      <div className="animated fadeIn delay-.5s">
        <Button fluid size="massive">
          <a href="/create"> Create Playlist</a>
        </Button>
        <br />
        <Button fluid size="massive">
          <a href="/join"> Join Playlist</a>
        </Button>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapState)(UserHome)

//  PROP TYPES
// UserHome.propTypes = {
//   email: PropTypes.string
// }
