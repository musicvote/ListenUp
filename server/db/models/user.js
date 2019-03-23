const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  spotifyUsername: {
    type: Sequelize.STRING
  }
})

module.exports = User
