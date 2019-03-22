import React from 'react'
import {connect} from 'react-redux'
import {joinParty} from '../store/playlistStore'

export class JoinParty extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      joinParty: ''
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler(evt) {
    evt.preventdefault()
    this.props.JoinWithCode(this.state.joinParty)
    // redirect to the socket room
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label>Party Code</label>
          <input
            name="joinParty"
            type="text"
            value={this.state.joinParty}
            onChange={this.changeHandler}
            placeholder="Enter Party Code"
          />
          <button type="submit">Join Party</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  partyJoined: state.user.partyIn
})

const mapDispatchToProps = dispatch => ({
  JoinWithCode: code => dispatch(joinParty(code))
})

export default connect(null)(JoinParty)
