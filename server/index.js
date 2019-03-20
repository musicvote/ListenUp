const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
// const IP = process.env.SPOTIFY_CLIENT_ID
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
const SpotifyStrategy = require('passport-spotify').Strategy
module.exports = app
const {client_id, client_secret, redirect_uri} = require('../secrets')
const {User} = require('./db/models')
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

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())
  app.use(cors())

  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  app.get('/', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
  })

  app.get(
    '/login',
    passport.authenticate('spotify', {
      scope,
      failureRedirect: '/',
      showDialog: true
    })
  )

  app.get(
    '/callback',
    passport.authenticate('spotify', {failureRedirect: '/'}),
    function(req, res) {
      User.findOrCreate({
        where: {id: req.user.id}
      })
      //TODO: update/create a component to direct to choose create playlist or join playlist
      res.redirect('/playlist')
    }
  )

  app.get('/me', function(req, res) {
    if (req.user) res.json(req.user)
    else res.json({})
  })

  app.get('/logout', (req, res) => {
    req.logout()
    req.session.destroy()
    res.json({})
  })

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}
