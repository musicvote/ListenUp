const router = require('express').Router()
module.exports = router
const {Song, Playlist, User} = require('../db/models')

router.use('/songs', require('./songs'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
