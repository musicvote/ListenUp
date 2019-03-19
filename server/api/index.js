const router = require('express').Router()
module.exports = router
const {Song, Playlist, User} = require('../db/models')

router.use('/users', require('./users'))
router.use('/songs', require('./songs'))

// Song.belongsTo(Playlist)
// Playlist.hasMany(Song)
// Playlist.belongsTo(User)
// User.hasOne(Playlist)

// Playlist.hasMany(Song)
// Song.hasMany(Playlist)

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
