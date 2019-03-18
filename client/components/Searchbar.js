import React, {Component} from 'react'

export default class Searchbar extends Component {
  constructor() {
    super()
    this.state = {
      songName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    // this.props.addNewSongToPlaylist(this.state) !!!
    this.setState({
      songName: ''
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input"
            name="songName"
            placeholder="Search song name..."
            value={this.state.songName}
            onChange={this.handleChange}
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     searchResult: state.songs,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {

//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Searchbar);
