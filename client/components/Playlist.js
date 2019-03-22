import React from 'react'
import {connect} from 'react-redux'
import {
  fetchPlaylist,
  CheckFetchSpotify,
  placeTopTwoToSpotify
} from '../store/playlistStore'
import SongCard from './SongCard'
import Player from './Player'
import Sidebar from './sidebar'
import heartbeat from 'heartbeats'

//Heartbeat config
//let heart = heartbeat.createHeart(30000)

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
            return <SongCard key={song.spotifySongID} song={song} />
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  playlist: state.songs
})

const mapDispatchToProps = dispatch => {
  // heart.createEvent(1, function() {
  //   console.log('heartBeat')
  //   const fire = () => dispatch(CheckFetchSpotify())
  //   fire()
  // })
  return {
    fetchedPlaylist: () => dispatch(fetchPlaylist()),
    isSongDone: nextOnDeck => dispatch(CheckFetchSpotify(nextOnDeck)),
    placeTopTwo: () => dispatch(placeTopTwoToSpotify())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
