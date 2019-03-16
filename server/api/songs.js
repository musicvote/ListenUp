//get one song
const router = require('express').Router()
const {Song} = require('../db/models')
const spotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new spotifyWebApi({
  clientId: 'f30f211450824a22bd223303ca42a33e',
  clientSecret: '92cba98e076e42e2944d489f830f4259',
  redirectUri: 'localhost:1337/callback'
})

spotifyApi.setAccessToken(
  'BQAQCWpSkVaoY_9kvSHdmlLzbLccVlHM_2VTxDjo7rTr50Au7q2LVQjhfShJpc0C-rMPn1eButSKTIh48z84wdYKkKHc8ETbC43IKZnQw7dIDiHwZT7r4SUH8Emm0qNUB3psIotGkVKdSTiuwl_KtYhJ77qYJdnxiQI'
)

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
    const myPlaylist = await spotifyApi.getPlaylist('5NASiveas4k209RBgVvH5B')
    res.json(myPlaylist)
  } catch (error) {
    next(error)
  }
})

router.get('/addToPlaylist', async (req, res, next) => {
  try {
    console.log('HI')
    const newPlaylist = await spotifyApi.addTracksToPlaylist(
      '5NASiveas4k209RBgVvH5B',
      [
        'spotify:track:24CXuh2WNpgeSYUOvz14jk',
        'spotify:track:2SG0RPcyWgUPqLCKWLtYc1'
      ]
    )
    console.log('this is the newplaylist', newPlaylist)
    res.json('TEST')
  } catch (error) {
    next(error)
  }
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
