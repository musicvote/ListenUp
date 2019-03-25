import React from 'react'
import VoteCount from './VoteCount'
import {Image, List} from 'semantic-ui-react'

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
      <div className="songcard">
        <List celled>
          <List.Item>
            <div id="Playlist-album-Image">
              <Image src={this.props.song.albumArtworkurl} />
            </div>
            <List.Content>
              <div>
                <List.Header>{this.props.song.songName}</List.Header>
                <List.Description>
                  {this.props.song.artistName}
                </List.Description>
              </div>
              <List.Description> Likes: {this.state.count}</List.Description>
              <VoteCount changeVote={this.changeVote} />
            </List.Content>
          </List.Item>
        </List>
      </div>
    )
  }
}

export default SongCard
