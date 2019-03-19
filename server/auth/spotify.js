const router = require('express').Router()
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy

const {User} = require('../db/models')
const {client_id, client_secret, redirect_uri} = require('../../secrets')
module.exports = router

const scope =
  'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming user-read-birthdate'
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID || client_id,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || client_secret,
      callbackURL: process.env.SPOTIFY_CLIENT_ID || redirect_uri
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      profile.access_token = accessToken
      profile.refresh_token = refreshToken
      return done(null, profile)
    }
  )
)

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
    console.log('this is inside the spotify route')
    res.redirect('/playlist')
  }
)

router.get('/me', function(req, res) {
  console.log('this is inside the ME in spotify')
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
