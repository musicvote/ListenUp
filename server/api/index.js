const router = require('express').Router()

router.use('/playlist', require('./playlist'))
router.use('/songs', require('./songs'))
router.use('/playlistSong', require('./playlistSong'))

router.use((req, res, next) => {
  const error = new Error('Not Found', '******')
  error.status = 404
  next(error)
})

module.exports = router
