import React from 'react'
import {Button} from 'semantic-ui-react'

const VoteCount = props => {
  const {changeVote} = props
  return (
    <div>
      <Button size="mini" type="button" onClick={() => changeVote(true)}>
        Like
      </Button>
    </div>
  )
}

export default VoteCount
