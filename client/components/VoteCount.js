import React from 'react'

const VoteCount = props => {
  const {changeVote} = props
  return (
    <div>
      <button type="button" onClick={() => changeVote(false)}>
        Dislike
      </button>
      <button type="button" onClick={() => changeVote(true)}>
        Like
      </button>
    </div>
  )
}

export default VoteCount
