import React from 'react'
import {connect} from 'react-redux'
import {addedPlaylistToDb} from '../store/user'

export class CreateParty extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      partyCode: '',
      partyExists: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addedPlaylistToDb(this.state.partyCode)
    //  redirect to the socket room
  }

  //event.target = partyCode
  //event.target.value = input into the playlistId form
  async handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    if (this.state.partyCode.length === 22) {
      const backFromDB = await this.props.addedPlaylistToDb(
        this.state.partyCode
      )
      if (backFromDB) {
        this.setState({partyExists: true})
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Copy and paste your Spotify playlist Url.</label>
          <input
            name="partyCode"
            type="text"
            value={this.state.partyCode}
            onChange={this.handleChange}
            placeholder="Enter Party Code"
          />
          {this.state.partyExists ? (
            <button type="submit">Create Party</button>
          ) : (
            <button type="submit">Create Party</button>
          )}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  partyCreated: state.user.createdPlaylist
})

//was findParty @zach
const mapDispatchToProps = dispatch => ({
  addedPlaylistToDb: playlistId => dispatch(addedPlaylistToDb(playlistId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateParty)
