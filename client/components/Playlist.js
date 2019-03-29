import React from 'react'
import {connect} from 'react-redux'
import {
  fetchPlaylist,
  CheckFetchSpotify,
  checkIsAdmin
} from '../store/playlistStore'
import SongCard from './SongCard'
import Searchbar from './Searchbar'
import Heartbeat from 'react-heartbeat'

class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist: [],
      isAdmin: false
    }
    this.CheckSpotify = this.CheckSpotify.bind(this)
  }
  async componentDidMount() {
    let playlistFromPath = this.props.location.pathname.split('/')[2]
    const isAdmin = await this.props.isAdminCheck(playlistFromPath)

    this.props.fetchedPlaylist(playlistFromPath).then(() => {
      this.setState({
        playlist: this.props.playlist.songs,
        isAdmin: this.props.playlist.isAdmin
      })
    })
  }

  CheckSpotify() {
    this.props.isSongDone({
      newDeckSong: this.state.playlist[2],
      newCurrSong: this.state.playlist[1],
      lastCurrSong: this.state.playlist[0]
    })
    this.setState({playlist: this.props.playlist.songs})
  }

  render() {
    return (
      <div className="main-component animated fadeIn delay-.5s">
        {this.state.isAdmin ? (
          <Heartbeat
            heartbeatFunction={() => this.CheckSpotify()}
            heartbeatInterval={10000}
          />
        ) : (
          <div />
        )}
        <h1 id="playlist-header">Zach's Playlist</h1>
        <Searchbar />
        <div>
          {this.props.playlist.songs.length ? (
            this.props.playlist.songs.map((song, i) => {
              if (i === 0) {
                return <SongCard class="currSong" key={song.id} song={song} />
              }
              if (i === 1) {
                return <SongCard class="deckSong" key={song.id} song={song} />
              } else {
                return <SongCard key={song.id} song={song} />
              }
            })
          ) : (
            <div>Add songs to get this party started</div>
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
