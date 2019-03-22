const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy
const {User} = require('../db/models')
module.exports = router
const {client_id, client_secret, redirect_uri} = require('../../secrets')

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

if (!client_id || !client_secret) {
  console.log('SPotify client ID / secret not found. Skipping Spotify OAuth.')
} else {
  const spotifyConfig = {
    clientID: client_id,
    clientSecret: client_secret,
    callbackURL: redirect_uri
  }

  const strategy = new SpotifyStrategy(
    spotifyConfig,
    (token, refreshToken, expires_in, profile, done) => {
      const spotifyId = profile.id
      // const name = profile.displayName
      // const email = profile.emails[0].value

      User.findOrCreate({
        where: {id: spotifyId}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  // router.get('/', passport.authenticate('spotify', {scope: 'email'}))
  router.get('/', passport.authenticate('spotify'))

  router.get(
    '/callback',
    passport.authenticate('spotify', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
