import React from 'react'

const Player = props => {
  return (
    <div>
      <h1>Player</h1>
      <iframe
        src={`https://open.spotify.com/embed/track/${props.songId}`}
        width="300"
        height="80"
        frameBorder="0"
        allow="encrypted-media"
      />
    </div>
  )
}

export default Player
