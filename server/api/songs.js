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
  'BQBjlY7ub074PHp5EHDf7zSzt8hQHEoKbIBsy8-ZPrBstiPtdYi8oMVuDdcvGhwQOxFf2QBnsrxUV9tirU25s106yVOzlHbqZrZnfScYjkK-cW5E1ibu1Aqc54Nq6GKTkw69nbfDhU2SKX9qVv-C53ENTPmSjo98ZVrzyg2UbN6cWB_DF797u5EI53qMDEMHQeYxgXbTYYF3_-N5CIz6Elen1KhTCQxgs3qnZrtPwGmUTacaiw5yHd6nHB4XnMpeh1PmTX3v5pwAmpDVJJQsbkuE5WN3HfXmFpc'
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

//Playlist method - gets particular playlist
//returns json object with all the tracks within a playlist
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
    .addTracksToPlaylist(playlistId, [`spotify:track:${songId}`], {
      position: 1
    })
    .then(
      data => {
        console.log(')))))))))) ', data)
        res.json({isAdded: true})
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
        res.json(data.body.item.id)
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
