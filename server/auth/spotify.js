const router = require('express').Router()
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy

const {User} = require('../db/models')
module.exports = router

const client_id = 'a604e5f5813c4ad7b2fc27abc314d7d0'
const client_secret = '4b8d6cc96fb245a39697cf3e542ae259'
const redirect_uri = 'http://localhost:8888/callback'

const scope =
  'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming user-read-birthdate'

router.get(
  '/login',
  passport.authenticate('spotify', {
    scope,
    failureRedirect: '/',
    showDialog: true
  })
)

router.get(
  '/callback',
  passport.authenticate('spotify', {failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/home')
  }
)

router.get('/me', function(req, res) {
  if (req.user) res.json(req.user)
  else res.json({})
})

router.get('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.json({})
})

router.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  let refresh_token = req.query.refresh_token
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(client_id + ':' + client_secret).toString('base64')
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  }

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token
      res.send({
        access_token: access_token
      })
    }
  })
})
