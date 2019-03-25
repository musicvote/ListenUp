const Sequelize = require('sequelize')
const db = require('../db')

const PlaylistSong = db.define('playlistSong', {
  hasPlayed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  voteCount: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = PlaylistSong
