const Sequelize = require('sequelize')
const db = require('../db')

const Song = db.define('song', {
  spotifySongID: {
    type: Sequelize.TEXT,
    primaryKey: true,
    allowNull: false
  },
  songName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  artistName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  albumArtworkurl: {
    type: Sequelize.TEXT
  }
})

module.exports = Song
