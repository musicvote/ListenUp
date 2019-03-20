import React, {Component} from 'react'
import {findSongFromSpotify} from '../store/playlistStore'
import {connect} from 'react-redux'

class Searchbar extends Component {
  constructor() {
    super()
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
    console.log('7878787: ', this.props)
    this.setState({songName: '', foundSongs: this.props.searchResult})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submitSongHandler(event) {
    console.log('this is evt.target', event.target.value)
  }

  render() {
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
          this.state.foundSongs.map(song => {
            return (
              <div key={song.songId}>
                <p>{song.label}</p>
                <button
                  onClick={this.submitSongHandler}
                  type="button"
                  value={song.value}
                >
                  +
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
    findMatches: songName => dispatch(findSongFromSpotify(songName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)
