import React from 'react'
import {connect} from 'react-redux'
import {joinParty} from '../store/playlistStore'

export class JoinParty extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      partyCode: '',
      partyExists: false
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  async changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    if (this.state.partyCode.length === 22) {
      const backFromDB = await this.props.findParty(this.state.partyCode)
      if (backFromDB) {
        this.setState({partyExists: true})
      }
    }
  }

  submitHandler(evt) {
    evt.preventdefault()
    // redirect to the socket room
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label>Party Code</label>
          <input
            name="partyCode"
            type="text"
            value={this.state.partyCode}
            onChange={this.changeHandler}
            placeholder="Enter Party Code"
          />
          {this.state.partyExists ? (
            <button type="submit">Join Party</button>
          ) : (
            <button disabled type="submit">
              Join Party
            </button>
          )}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  partyJoined: state.user.partyIn
})

const mapDispatchToProps = dispatch => ({
  findParty: code => dispatch(findThatParty(code))
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinParty)
