import React from 'react'
import {connect} from 'react-redux'
import {
  fetchPlaylist,
  CheckFetchSpotify,
  moveTopVoteToDeck
} from '../store/playlistStore'
import SongCard from './SongCard'
import Player from './Player'

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
        <button type="button" onClick={this.CheckSpotify}>
          Check Spotify
        </button>
        <h1>test</h1>
        <div>
          {this.props.playlist.songs.length ? (
            this.props.playlist.songs.map(song => {
              return <SongCard key={song.songSpotifyId} song={song} />
            })
          ) : (
            <div>Sorry this playlist is empty.</div>
          )}
        </div>
        <Player songId={this.props.playlist.deckSong.id} />
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
