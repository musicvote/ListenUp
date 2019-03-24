const router = require('express').Router()
const User = require('../db/models')
module.exports = router

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/spotify', require('./spotify'))

// const scope =
//   'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming user-read-birthdate'
