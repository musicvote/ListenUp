const router = require('express').Router()
const {Song, Playlist, User} = require('../db/models')

router.use('/songs', require('./songs'))

router.use((req, res, next) => {
  console.log('this is inside the use route in index.js')
  const error = new Error('Not Found', '******')
  error.status = 404
  next(error)
})

module.exports = router
