import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Form, Input} from 'semantic-ui-react'

export default class JoinParty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlistId: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div id="join-playlist">
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <input
              type="text"
              className="input"
              name="playlistId"
              placeholder="Playlist Code..."
              onChange={this.handleChange}
            />
            {this.state.playlistId.length === 22 ? (
              <Link to={`/playlist/${this.state.playlistId}`}>Join Party</Link>
            ) : (
              <p>
                Please Copy and paste the 22 character Spotify Playlist Id in
                the search box. we will use this to create your musicVote
                playlist
              </p>
            )}
          </Form.Field>
        </Form>
      </div>
    )
  }
}
