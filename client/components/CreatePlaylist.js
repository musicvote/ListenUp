import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addPlaylistToDb} from '../store/user'

export class CreatePlaylist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlistId: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.addPlaylistToDb(this.state.playlistId)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    console.log('!!!!!!!!!!!!!', this.props)

    return (
      <div>
        <div />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input"
            name="playlistId"
            placeholder="Input Spotify Playlist ID"
            onChange={this.handleChange}
          />
          <Button className="submit-btn" type="submit">
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPlaylist: state.user.currentPlaylist
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPlaylistToDb: playlistId => dispatch(addPlaylistToDb(playlistId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist)
