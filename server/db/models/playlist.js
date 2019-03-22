const Sequelize = require('sequelize')
const db = require('../db')

const Playlist = db.define('playlist', {
  spotifyPlaylistId: {
    type: Sequelize.TEXT,
    primaryKey: true,
    allowNull: false
  }
})

module.exports = Playlist
