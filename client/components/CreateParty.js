import React from 'react'
import {connect} from 'react-redux'
import {addedPlaylistToDb} from '../store/user'
import parseSpotifyUrl from '../parseUrlFunc'
import {Input, Button, Header} from 'semantic-ui-react'
import {toast} from 'react-toastify'

export class CreateParty extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newPlaylistId: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    toast.info(<div>'Playlist created!'</div>)
    event.preventDefault()
    if (this.state.newPlaylistId.length === 22) {
      this.props.addedPlaylistToDb(this.state.newPlaylistId)
      this.props.history.push(`/playlist/${this.state.newPlaylistId}`)
    } else {
      const parsedPlaylistId = parseSpotifyUrl(this.state.newPlaylistId)
      this.props.addedPlaylistToDb(parsedPlaylistId)
      this.props.history.push(`/playlist/${parsedPlaylistId}`)
    }
  }

  //event.target = newPlaylistId
  //event.target.value = input into the newPlaylistId form
  async handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="create-party-input">
        <form onSubmit={this.handleSubmit}>
          <Header as="h3">Copy and paste your Spotify playlist Url</Header>
          <Input
            name="newPlaylistId"
            type="text"
            value={this.state.newPlaylistId}
            onChange={this.handleChange}
            placeholder="Enter Party Code"
          />
          {/* clicking create playlist makes a row in the playlist table and changes the url to the /playlist/newPlaylistId */}
          <Button type="submit">Create party</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  partyCreated: state.user.createdPlaylist
})

const mapDispatchToProps = dispatch => ({
  addedPlaylistToDb: playlistId => dispatch(addedPlaylistToDb(playlistId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateParty)
