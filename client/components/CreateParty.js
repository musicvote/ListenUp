import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'

export default class CreateParty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlistId: ''
    }
  }

  render() {
    return (
      <div id="create-playlist">
        <div />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input"
            name="playlistId"
            placeholder="Search song name..."
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
