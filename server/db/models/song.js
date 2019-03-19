const Sequelize = require('sequelize')
const db = require('../db')

const Song = db.define('song', {
  spotifySongID: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  hasPlayed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Song
