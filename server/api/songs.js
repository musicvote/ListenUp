//get one song
const router = require('express').Router()
const {Song} = require('../db/models')
const spotifyWebApi = require('spotify-web-api-node')
const {client_id, client_secret, redirect_uri} = require('../../secrets')
const axios = require('axios')
const spotifyApi = new spotifyWebApi({
  clientID: process.env.SPOTIFY_CLIENT_ID || client_id,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || client_secret,
  callbackURL: process.env.SPOTIFY_CLIENT_ID || redirect_uri
})
module.exports = router
const accessToken =
  'BQBB1nz4_sopQZyE8YIkZBsdmgOkb7aN2s8ul4GjSefLuHvdDGp79uPpACk6pvVgx4ncCePZ0IdswlKOW6rSJk08VuOy_Zea1fEUBCVCwMCFrOl1CsUiQhnpzGM31P2EIS4R4j7LBMCkHEZetsQMD12BF1BuQfbQCHA'

const playlistId = '6UOF0Hq6ffLXnADFQxVKUH'

router.get('/', async (req, res, next) => {
  try {
    console.log('Need this route to stop getting error')
    res.sendStatus(202)
  } catch (error) {
    next(error)
  }
})

// router.post('/addToPlaylist', (req, res, next) => {
//   let songId = req.body.id
//   spotifyApi
//     .addTracksToPlaylist(playlistId, [`spotify:track:${songId}`], {
//       position: 1
//     })
//     .then(
//       data => {
//         console.log(')))))))))) ', data)
//         res.json(data)
//       },
//       err => {
//         console.log('Something went wrong!', err)
//       }
//     )
//     .catch(next)
// })

// router.get('/getCurrentlyPlaying', (req, res, next) => {
//   spotifyApi
//     .getMyCurrentPlayingTrack()
//     .then(
//       data => {
//         // Output items
//         res.json(data.body.item.id)
//       },
//       err => {
//         console.log('Something went wrong!', err)
//       }
//     )
//     .catch(next)
// })

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

//when a user for a song, check our DB first to see if we have that song, if we do, return that song to the user without pinging spotify
router.get('/search-song', async (req, res, next) => {
  try {
    const songId = req.body
    const track = await Song.findAll({where: {spotifySongId: songId}})
    if (track) {
      res.json(track)
    } else {
      res.send('track not found')
    }
  } catch (error) {
    next(error)
  }
})

//when a searches for a song, and we see that we do not have that song in our DB, we need to ping spotify to get the song, then create a new instance i our songs DB with that song returned from spotify
router.post('/search-song', async (req, res, next) => {
  try {
    //make sure we are sending just the id {id: njvdnsajkanvjdkas}
    const songId = req.body
    const spotifySeachResult = await axios.get(
      `https://api.spotify.com/v1/tracks/${songId}`,
      {
        headers: {Authorization: 'Bearer ' + accessToken}
      }
    )
    console.log('SPOTIFY SEARCH RESULT', spotifySeachResult)
    const addedSong = await Song.create({
      spotifySongID: spotifySeachResult.data.id
    })
    res.json(addedSong)
  } catch (error) {
    next(error)
  }
})
