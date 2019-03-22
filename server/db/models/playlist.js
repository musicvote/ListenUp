const Sequelize = require('sequelize')
const db = require('../db')

const Playlist = db.define('playlist', {
  spotifyPlaylistId: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Playlist

// const playlist = await Playlist.findOne({
//   where: {
//     spotifyPlaylistId: spotifyPlaylistId
//   }
// })

// const songAdded = await Song.create({
//     spotifySongID: selectedSong.songId,
//     songName: selectedSong.songName,
//     artistName: selectedSong.artist,
//     albumArtworkurl: selectedSong.imageUrl,
//     playlistId: playlist.id
// })
// const addSong = PlaylistSong.create({
//   playlistId: playlist.id,
//   songId: songAdded.id
// })
