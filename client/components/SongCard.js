import React from 'react'
import VoteCount from './VoteCount'

class SongCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    this.changeVote = this.changeVote.bind(this)
  }

  changeVote(isIcrease) {
    if (isIcrease) {
      this.setState(prevState => ({count: prevState.count + 1}))
    } else {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  render() {
    return (
      <div className="listBorder">
        <img src={this.props.song.albumArtworkurl} />
        <div className="searchbar">
          <h1>{this.props.song.songName}</h1>
          <h3>{this.props.song.artistName}</h3>
          <h4>{this.state.count}</h4>
        </div>
        <div>
          <VoteCount changeVote={this.changeVote} />
        </div>
      </div>
    )
  }
}

export default SongCard
