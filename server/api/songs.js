const router = require('express').Router()
const {Song, Playlist_song} = require('../db/models')
const spotifyWebApi = require('spotify-web-api-node')
const {client_id, client_secret, redirect_uri} = require('../../secrets')
const axios = require('axios')
module.exports = router

const spotifyApi = new spotifyWebApi({
  clientID: process.env.SPOTIFY_CLIENT_ID || client_id,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || client_secret,
  callbackURL: process.env.SPOTIFY_CLIENT_ID || redirect_uri
})

const accessToken =
  'BQBX82gWajwL0m9A6_gsXT-no6lm3Oe-prFuBQxaoxULErNaeGzHo0qjx1ayitoAtdU1Bpe88lSI46trlL30hmeTeIzeKtG-yypbkq0_GGq7EQFhdvjnwJlKNPIe4WESH9rFXY4WEhuht9kO1-ZQj8JZDKPKJpEQ8sBYxgvhfMndS7Xq7YDFUIZUsS1NhnoWMDRjUZKXwYWVAUYI3rg5AqgRk4UG82CMLqWUno_6-tcjWqNIxR61haH2PFtssgEZng2Z1a399hDdYLSysusxicpzaWBPEqQU9LY'

const playlistId = '6UOF0Hq6ffLXnADFQxVKUH'

// router.get('/', async (req, res, next) => {
//   try {
//     console.log('Need this route to stop getting error')
//     res.sendStatus(202)
//   } catch (error) {
//     next(error)
//   }
// })

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

//api/songs/
router.get('/', async (req, res, next) => {
  try {
    const songList = await Song.findAll()
    res.status(200).send(songList)
  } catch (error) {
    next(error)
  }
})

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

router.get('/searchSpotify/:searchTerm', async (req, res, next) => {
  try {
    const search = req.params.searchTerm
    const {data} = await axios.get(
      `https://api.spotify.com/v1/search?q=${search}&type=track`,
      {
        method: 'GET',
        headers: {Authorization: 'Bearer ' + accessToken},
        'Content-Type': 'application/json'
      }
    )

    console.log(data.tracks.items)
    const allItems = data.tracks.items.reduce((acc, item) => {
      let makeItem = {
        artist: item.artists[0].name,
        songName: item.name,
        songId: item.id,
        imageUrl: item.album.images[2].url
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
    const allSongs = await Playlist_song.findAll({
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
    //need to revise
    const playlistId = req.params.playlistId
    const selectedSong = req.body.selectedSong
    console.log(selectedSong)
    const addedSong = await Song.findOrCreate({
      where: {
        spotifySongID: selectedSong.songId,
        songName: selectedSong.songName,
        artistName: selectedSong.artist,
        albumArtworkurl: selectedSong.imageUrl
      }
      // include: [{}]
    })
    // const addedToJoin = await Playlist_song.findOrCreate({
    //   playlistId: playlistId,
    //   spotifySongID: selectedSong.songId
    // })

    res.json(addedSong)
  } catch (error) {
    next(error)
  }
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
