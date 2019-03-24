import React from 'react'
import {connect} from 'react-redux'
import {
  fetchPlaylist,
  CheckFetchSpotify,
  placeTopTwoToSpotify
} from '../store/playlistStore'
import SongCard from './SongCard'
import Searchbar from './Searchbar'
import Sidebar from './sidebar'
import Heartbeat from 'react-heartbeat'

//Heartbeat config
//let heart = heartbeat.createHeart(5000)

export class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist: [],
      isAdmin: false
    }
    this.CheckSpotify = this.CheckSpotify.bind(this)
  }
  componentDidMount() {
    this.props.fetchedPlaylist().then(() => {
      this.setState({playlist: this.props.playlist.songs})
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
    console.log(this.props)
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
              return <SongCard key={song.spotifySongID} song={song} />
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
    fetchedPlaylist: () => dispatch(fetchPlaylist()),
    isSongDone: nextOnDeck => dispatch(CheckFetchSpotify(nextOnDeck)),
    placeTopTwo: () => dispatch(placeTopTwoToSpotify())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
