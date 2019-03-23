const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  spotifyId: {
    type: Sequelize.TEXT
  }
})

module.exports = User
