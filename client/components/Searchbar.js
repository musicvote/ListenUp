import React, {Component} from 'react'
import {findSongFromSpotify, postSongToPlaylist} from '../store/playlistStore'
import {connect} from 'react-redux'

class Searchbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      songName: '',
      foundSongs: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.submitSongHandler = this.submitSongHandler.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    // this.props.addNewSongToPlaylist(this.state) !!!
    await this.props.findMatches(this.state.songName)
    this.setState({songName: '', foundSongs: this.props.searchResult})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submitSongHandler(event) {
    // const Number(event.target.value)
    const pickedSong = this.state.foundSongs[event.target.value]
    console.log('this is evt.target', pickedSong)
    this.props.songPickedNowPost(pickedSong)
  }

  render() {
    console.log('************', this.props)
    return (
      <div id="searchbar">
        <div />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input"
            name="songName"
            placeholder="Search song name..."
            value={this.state.songName}
            onChange={this.handleChange}
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>

        {this.state.foundSongs.length ? (
          this.state.foundSongs.map((song, i) => {
            return (
              <div key={song.songId}>
                <p>{`${song.artist} - ${song.songName}`}</p>
                <button
                  onClick={this.submitSongHandler}
                  type="button"
                  value={i}
                >
                  add
                </button>
              </div>
            )
          })
        ) : (
          <div>Not found</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchResult: state.songs.searchResult
  }
}

const mapDispatchToProps = dispatch => {
  return {
    findMatches: songName => dispatch(findSongFromSpotify(songName)),
    songPickedNowPost: songObj => dispatch(postSongToPlaylist(songObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)
