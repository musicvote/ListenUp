import React from 'react'
import VoteCount from './VoteCount'
import {connect} from 'react-redux'
import {updateVotesInDb} from '../store/playlistStore'

class SongCard extends React.Component {
  constructor(props) {
    super(props)

    this.changeVote = this.changeVote.bind(this)
  }

  changeVote() {
    this.props.updateVotesInDb(
      this.props.song.id,
      this.props.song.playlistSong.voteCount
    )
    this.forceUpdate()
  }

  render() {
    console.log('this.props songcard', this.props)
    return (
      <div className="listBorder">
        <img src={this.props.song.albumArtworkurl} />
        <div className="searchbar">
          <h1>{this.props.song.songName}</h1>
          <h3>{this.props.song.artistName}</h3>
          <h4>{this.props.song.playlistSong.voteCount}</h4>
        </div>
        <div>
          <VoteCount changeVote={this.changeVote} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  updateVotesInDb: (songId, voteAmount) =>
    dispatch(updateVotesInDb(songId, voteAmount))
})

export default connect(mapStateToProps, mapDispatchToProps)(SongCard)
