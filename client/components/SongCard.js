import React from 'react'
const SongCard = props => {
  let {title, artist, songId, voteCount} = props.song
  return (
    <div id="song">
      <h1>{title}</h1>
      <h3>{artist}</h3>
      <h3>{songId}</h3>
      <div>
        <h3>{voteCount}</h3>
        <h2>{props.voteCount}</h2>
        <a href="#" className="upvote-link">
          upvote count:
        </a>
      </div>
    </div>
  )
}

export default SongCard
