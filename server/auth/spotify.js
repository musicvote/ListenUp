const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy
const {User} = require('../db/models')
module.exports = router

const spotifyApi = {
  clientID: process.env.SPOTIFY_CLIENT_ID || client_id,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || client_secret,
  callbackURL: process.env.SPOTIFY_CALLBACK || redirect_uri
}

if (!spotifyApi.clientID || !spotifyApi.clientSecret) {
  console.log('SPotify client ID / secret not found. Skipping Spotify OAuth.')
} else {
  const spotifyConfig = {
    clientID: spotifyApi.clientID,
    clientSecret: spotifyApi.clientSecret,
    callbackURL: spotifyApi.callbackURL
  }

  const strategy = new SpotifyStrategy(
    spotifyConfig,
    (token, refreshToken, expires_in, profile, done) => {
      const spotifyUsername = profile.id

      User.findOrCreate({
        where: {spotifyUsername}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)
  router.get('/', passport.authenticate('spotify'))

  router.get(
    '/callback',
    passport.authenticate('spotify', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
