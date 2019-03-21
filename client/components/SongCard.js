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
      <div>
        <h1>{this.props.song.title}</h1>
        <h3>{this.props.song.artist}</h3>
        <h3>{this.props.song.songId}</h3>
        <h4>{this.state.count}</h4>
        {/* <div>
          <VoteCount changeVote={this.changeVote} />
        </div> */}
      </div>
    )
  }
}

export default SongCard
