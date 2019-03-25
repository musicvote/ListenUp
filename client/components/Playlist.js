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
        <Searchbar />
        <div id="playlist">
          {this.props.playlist.songs.length ? (
            this.props.playlist.songs.map(song => {
              return <SongCard key={song.id} song={song} />
            })
          ) : (
            <div>Sorry no songs</div>
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
