import React from 'react'

const Player = props => {
  return (
    <div>
      <h1>Player</h1>

      <div id="player">
        <iframe
          src="https://open.spotify.com/embed/track/6PCUP3dWmTjcTtXY02oFdT"
          width="300"
          height="80"
          frameBorder="0"
          allowTransparency="true"
          allow="encrypted-media"
        />
      </div>


    </div>
  )
}

export default Player
