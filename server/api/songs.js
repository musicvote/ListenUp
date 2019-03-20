//get one song
const router = require('express').Router()
const {Song, playlist_song} = require('../db/models')
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

//when a user search a song, check our DB first to see if we have that song, if we do, return that song to the user without pinging spotify

router.get('/searchSpotify', async (req, res, next) => {
  try {
    const searchResult = await axios.get(
      `api.spotify.com/v1/search?q=${search}&type=track`,
      {
        headers: {Authorization: 'Bearer ' + accessToken}
      }
    )
    const allItems = searchResult.tracks.items.reduce((acc, item) => {
      let makeItem = {
        artist: item.artists[0].name,
        songName: item.name,
        songId: item.id,
        imageUrl: 'item.FIND WHERE THE IMAGEURL IS IN THE JSON'
      }
      acc.push(makeItem)
      return acc
    }, [])

    res.json(allItems)
  } catch (error) {
    next(error)
  }
})

//returns all songs in the database
router.get('/:playlistId/searchDb', async (req, res, next) => {
  try {
    const playlistId = req.params.playlistId
    const allSongs = await playlist_song.findAll({
      where: {playlistId}
    })
    if (allsongs) {
      res.json(allSongs)
    } else {
      res.json('No songs in playlist')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:playlistId/addToDb', async (req, res, next) => {
  try {
    const playlistId = req.params.playlistId
    const selectedSong = req.body
    const addedSong = await playlist_song.findOrCreate({
      where: {playlistId}
    })
    res.json(addedSong)
  } catch (error) {
    next(error)
  }
})
