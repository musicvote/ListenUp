const router = require('express').Router()
const {Song, Playlist, User, PlaylistSong} = require('../db/models')

router.use('/songs', require('./songs'))

router.use((req, res, next) => {
  const error = new Error('Not Found', '******')
  error.status = 404
  next(error)
})

module.exports = router
