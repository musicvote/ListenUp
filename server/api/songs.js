//get one song
const router = require('express').Router()
const {Song} = require('../db/models')
const spotifyWebApi = require('spotify-web-api-node')
const {client_id, client_secret, redirect_uri} = require('../../secrets')
const axios = require('axios')
module.exports = router

const spotifyApi = new spotifyWebApi({
  clientID: process.env.SPOTIFY_CLIENT_ID || client_id,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || client_secret,
  callbackURL: process.env.SPOTIFY_CLIENT_ID || redirect_uri
})
spotifyApi.setAccessToken(
  'BQCAM0z-9ZZORpZdES9XSHfhmbZQrCX18uc0uzakoDBapkQSllDFhvuuV0jOwulmelTcWAW8KGrFUI3zavTfVTWd6KZ11xmjzk9FIvqdGOb35dM71e8vCREUfAwWIv99VaXEafTJnhC9vU_A49Fx7iErz3AiwARAURecTC4VB8BP4ZBhhczFMlEgMmHcyRsB9InwE2155XGZzFgXDmCb_nF0b9uE2RKxO76gUUtbvSTa4jgt9yv4U2vGDQ-GTWpu6JFSTB65d7__EHwnhYTf9Z3QWNvPzQTBjG0'
)

const playlistId = '6UOF0Hq6ffLXnADFQxVKUH'

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

//find song where track name has sandstorm
router.get('/getSong', async (req, res, next) => {
  try {
    const song = await fetch(
      'https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl'
    )

    res.json(song.body.item)
  } catch (error) {
    next(error)
  }
})

//get songs from spotify
router.get('/search', async (req, res, next) => {
  //Playlist method - gets particular playlist
  //returns json object with all the tracks within a playlist
  try {
    const albumResult = await spotifyApi.getArtistAlbums(
      '43ZHCT0cAZBISjO8DG9PnE'
    )
    res.json(albumResult)
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
