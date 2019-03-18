import React from 'react'
import {connect} from 'react-redux'
import {
  fetchPlaylist,
  CheckFetchSpotify,
  moveTopVoteToDeck
} from '../store/playlistStore'
import SongCard from './SongCard'
import Player from './Player'
import Sidebar from './sidebar'

export class Playlist extends React.Component {
  constructor(props) {
    super(props)

    this.CheckSpotify = this.CheckSpotify.bind(this)
  }
  componentDidMount() {
    this.props.fetchedPlaylist()
  }

  CheckSpotify() {
    this.props.isSongDone()
    //this.props.moveToDeck()
  }

  render() {
    console.log(this.props.playlist.deckSong)
    return (
      <div>
        <h1>Playlist</h1>
        <Sidebar />
        <div id="playlist">
          <div>
            <button type="button" onClick={this.CheckSpotify}>
              Check Spotify
            </button>
          </div>
          {this.props.playlist.songs.map(song => {
            return <SongCard key={song.songSpotifyId} song={song} />
          })}
        </div>
        <Player />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  playlist: state.songs
})

const mapDispatchToProps = dispatch => ({
  fetchedPlaylist: () => dispatch(fetchPlaylist()),
  isSongDone: () => dispatch(CheckFetchSpotify()),
  moveToDeck: () => dispatch(moveTopVoteToDeck())
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
