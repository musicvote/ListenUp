//get one song
const router = require('express').Router()
const {Song} = require('../db/models')
const spotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new spotifyWebApi({
  clientId: 'f30f211450824a22bd223303ca42a33e',
  clientSecret: '92cba98e076e42e2944d489f830f4259',
  redirectUri: 'localhost:8080/callback'
})

spotifyApi.setAccessToken(
  'BQC9-2rl5Us4SnNoYV_O2uz41qR4RGJbyto2ONSTleyrotiLraT6t0FyKST4w9QvrfpLQ8a4nyIl3xj5HyiVt890GKgZUMXFVuR9ZMoOqHv4dwSGGtG2kN3k-TPoRIHF61PUZGl2JfbQk3JGXohFvkTIyPMgpfzVZf99_srfLWzfUbrqmNbva1rEmC7-ZWEensPGkMpoEaftWUIE0atFHGI10ta9b4M1CJm-hjvfREUA4zQiXk95vI-kgXgg9-yI9mZ8eyibajvIUf-zI3GHnC5kok6PyWPU5-o'
)

const playlistId = '6UOF0Hq6ffLXnADFQxVKUH'

// const authorizationCode = 'playlist-modify-public'

//get song by ID
//api/songs/
router.get('/', async (req, res, next) => {
  try {
    const songList = await Song.findAll()
    res.status(200).send(songList)
  } catch (error) {
    next(error)
  }
})

//get songs from spotify
router.get('/search', async (req, res, next) => {
  try {
    console.log(spotifyApi, 'this is inside the route')
    const albumResult = await spotifyApi.getArtistAlbums(
      '43ZHCT0cAZBISjO8DG9PnE'
    )
    res.json(albumResult)
  } catch (error) {
    next(error)
  }
})

//Playlist method
router.get('/getPlaylist', async (req, res, next) => {
  try {
    //this should be a POST request after test is done
    // const playlistName = req.body
    const myPlaylist = await spotifyApi.getPlaylist(playlistId)
    res.json(myPlaylist)
  } catch (error) {
    next(error)
  }
})

router.post('/addToPlaylist', (req, res, next) => {
  let songId = req.body.id
  spotifyApi
    .addTracksToPlaylist(playlistId, [`spotify:track:${songId}`])
    .then(
      data => {
        console.log(')))))))))) ', data)
        res.json(data)
      },
      err => {
        console.log('Something went wrong!', err)
      }
    )
    .catch(next)
})

router.get('/getCurrentlyPlaying', (req, res, next) => {
  spotifyApi
    .getMyCurrentPlayingTrack()
    .then(
      data => {
        // Output items
        console.log('%%%%%%: ', data.body.is_playing)
        res.json(data)
      },
      err => {
        console.log('Something went wrong!', err)
      }
    )
    .catch(next)
})

module.exports = router

// clientId, clientSecret and refreshToken has been set on the api object previous to this call.
// spotifyApi.refreshAccessToken().then(
//   function(data) {
//     console.log('The access token has been refreshed!');

//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//   },
//   function(err) {
//     console.log('Could not refresh access token', err);
//   }
// );
