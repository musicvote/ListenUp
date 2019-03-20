const router = require('express').Router()
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const {User} = require('../db/models')
const {client_id, client_secret, redirect_uri} = require('../../secrets')
module.exports = router

//Keeping for now. would like to refractor so spotify oauth flows into this route. currently spotify is done on the server/index.js
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
    res.redirect('/playlist')
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

// router.post('/login', async (req, res, next) => {
//   try {
//     const user = await User.findOne({where: {email: req.body.email}})
//     if (!user) {
//       console.log('No such user found:', req.body.email)
//       res.status(401).send('Wrong username and/or password')
//     } else if (!user.correctPassword(req.body.password)) {
//       console.log('Incorrect password for user:', req.body.email)
//       res.status(401).send('Wrong username and/or password')
//     } else {
//       req.login(user, err => (err ? next(err) : res.json(user)))
//     }
//   } catch (err) {
//     next(err)
//   }
// })

// router.post('/signup', async (req, res, next) => {
//   try {
//     const user = await User.create(req.body)
//     req.login(user, err => (err ? next(err) : res.json(user)))
//   } catch (err) {
//     if (err.name === 'SequelizeUniqueConstraintError') {
//       res.status(401).send('User already exists')
//     } else {
//       next(err)
//     }
//   }
// })

// router.post('/logout', (req, res) => {
//   req.logout()
//   req.session.destroy()
//   res.redirect('/')
// })

// router.get('/me', (req, res) => {
//   console.log('this is insdie index.ks')
//   res.json(req.user)
// })
