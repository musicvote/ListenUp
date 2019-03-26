import React from 'react'
import {connect} from 'react-redux'
import {
  fetchPlaylist,
  CheckFetchSpotify,
  checkIsAdmin
} from '../store/playlistStore'
import SongCard from './SongCard'
import Searchbar from './Searchbar'
import Sidebar from './sidebar'
import Heartbeat from 'react-heartbeat'

class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist: [],
      playlistFromPath: '',
      isAdmin: false
    }
    this.CheckSpotify = this.CheckSpotify.bind(this)
  }
  async componentDidMount() {
    let playlistFromPath = this.props.location.pathname.split('/')[2]
    const isAdmin = await this.props.isAdminCheck(playlistFromPath)
    //less than two check

    this.props.fetchedPlaylist(playlistFromPath).then(() => {
      this.setState({
        playlist: this.props.playlist.songs,
        isAdmin: this.props.playlist.isAdmin,
        playlistFromPath
      })
    })
  }

  CheckSpotify() {
    if (this.state.playlist.length >= 2) {
      let playlistFromPath = this.props.location.pathname.split('/')[2]
      this.props.isSongDone({
        newDeckSong: this.state.playlist[2],
        newCurrSong: this.state.playlist[1],
        lastCurrSong: this.state.playlist[0],
        playlistId: playlistFromPath
      })
    }
    this.setState({playlist: this.props.playlist.songs})
  }

  render() {
    console.log('Playlist State: ', this.state.playlistFromPath)
    return (
      <div>
        {this.state.isAdmin ? (
          <Heartbeat
            heartbeatFunction={() => this.CheckSpotify()}
            heartbeatInterval={10000}
          />
        ) : (
          <div />
        )}

        <h1>Playlist</h1>
        <Sidebar />
        <Searchbar playlist={this.state.playlistFromPath} />
        <div id="playlist">
          {this.props.playlist.songs.length >= 1 ? (
            this.props.playlist.songs.map(song => {
              return <SongCard key={song.id} song={song} />
            })
          ) : (
            <div>Please add at least 2 songs to start this PARTY!!!</div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  playlist: state.songs,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    fetchedPlaylist: playlistId => dispatch(fetchPlaylist(playlistId)),
    isSongDone: nextOnDeck => dispatch(CheckFetchSpotify(nextOnDeck)),
    isAdminCheck: userId => dispatch(checkIsAdmin(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
