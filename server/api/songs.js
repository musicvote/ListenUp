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

spotifyApi.setAccessToken(
  'BQAStW6Niib8tsmR_6h2mb29FO0Yl01QV8mqrfm0amp1gvjDDMRlhMZa1j94PyGuCLAdyC9zz9DGxd7BAD9jxhuQ15CIt_E28uUbgpGnYk-KNrD8_Z1EW6IzPT89IvxccwnmP8kBKeIGB0Mu2XIYXXf8s5Lbas57Qgs-A7C87o7Xvx93FKZtMn_yY2NoOz6GhWwYkw2AsiWAuyVSATf234EdQNP7xZzkVCJ35yKZMUAiGij4ejW4TP1C_0I7Rp09AxcTYNGoT-3mGEtaF0-0VbPQT_IeDdLz6j0'
)

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
        artist: `${item.artists[0].name},
        songName: ${item.name}`,
        value: item.id,
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
