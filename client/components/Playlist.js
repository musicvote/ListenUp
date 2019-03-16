import React from 'react'
import {connect} from 'react-redux'
import {fetchPlaylist} from '../store/playlistStore'
import SongCard from './SongCard'
import Player from './Player'

export class Playlist extends React.Component {
  componentDidMount() {
    this.props.fetchedPlaylist()
  }

  render() {
    return (
      <div>
        <h1>Playlist</h1>
        {this.props.playlist.songs.map(song => {
          return <SongCard key={song.songSpotifyId} song={song} />
        })}
        <Player />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  playlist: state.songs
})

const mapDispatchToProps = dispatch => ({
  fetchedPlaylist: () => dispatch(fetchPlaylist())
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
