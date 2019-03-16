import React from 'react'
const SongCard = props => {
  let {title, artist, songId, voteCount} = props.song
  return (
    <div>
      <h1>{title}</h1>
      <h3>{artist}</h3>
      <h3>{songId}</h3>
      <div>
        <h3>{voteCount}</h3>
        <h2>{props.voteCount}</h2>
      </div>
    </div>
  )
}

export default SongCard
