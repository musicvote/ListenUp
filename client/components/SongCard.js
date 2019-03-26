import React from 'react'
import VoteCount from './VoteCount'
import {Grid, Image} from 'semantic-ui-react'

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
    {
      console.log(this.props.song)
    }
    return (
      <Grid divided="vertically" columns={3}>
        <Grid.Row className="playlist-Rows">
          <Grid.Column width={3}>
            <Image src={this.props.song.albumArtworkurl} centered rounded />
          </Grid.Column>
          <Grid.Column width={7}>
            <Grid.Row verticalAlign="bottom" textAlign="right">
              {this.props.song.songName}
            </Grid.Row>
            <Grid.Row verticalAlign="bottom">
              {' '}
              {this.props.song.artistName}
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>Likes: {this.state.count}</Grid.Row>
            <VoteCount changeVote={this.changeVote} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default SongCard
