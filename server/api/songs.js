const router = require('express').Router()
const {Song, PlaylistSong, Playlist} = require('../db/models')
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
  'BQAQBcWiu_LUFsR3h99DOqwkqs3djGA5ibA6WW5ZUhVRRMqJ6_7cY-mUjRPjtfyG5263tz4OHph_COcEOIbc68uQ4dd1JFygYywtMOEjT2gnuHCbzngZo_bJ1wkZQa_QPnBd1r3yCYgaxHB8EzZAAuWEXklLgvUkkm_xbWo3Pwm8W-CdaghOu15nLpN_bOjOt21RqO9-QQd4ry2-qhHAdDEybhmcQBSqpeyw5afWYF_X8Y3GiASKmo02UmJiZ1hpbSbTMKDRlIV3hpRFOg-NGUZM-2nnG90SVyc'

spotifyApi.setAccessToken(accessToken)

const playlistId = '6UOF0Hq6ffLXnADFQxVKUH'

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

router.delete('/removeFromPlaylist', (req, res, next) => {
  let removeSongId = req.body.lastCurrSongId
  console.log('TCL: removeSongId', removeSongId)

  var tracks = [{uri: `spotify:track:${removeSongId}`}]

  spotifyApi
    .removeTracksFromPlaylist(playlistId, tracks)
    .then(
      function(data) {
        console.log('Tracks removed from playlist!')
      },
      function(err) {
        console.log('Something went wrong!', err)
      }
    )
    .catch(next)
})

router.post('/addToPlaylist', (req, res, next) => {
  let songId = req.body.newSong.spotifySongID

  spotifyApi
    .addTracksToPlaylist(playlistId, [`spotify:track:${songId}`], {
      position: 2
    })
    .then(
      data => {
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
        res.json(data.body.item)
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
    const allSongs = await PlaylistSong.findAll({
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

router.post('/:spotifyPlaylistId/addToDb', async (req, res, next) => {
  try {
    const spotifyPlaylistId = '6UOF0Hq6ffLXnADFQxVKUH'
    const selectedSong = req.body.selectedSong

    const playlist = await Playlist.findOne({
      where: {spotifyPlaylistId: spotifyPlaylistId}
    })
    if (!playlist) {
      res.status(204).send('Playlist does not exit')
    } else {
      const songInDb = await Song.findOne({
        where: {
          spotifySongID: selectedSong.songId,
          songName: selectedSong.songName,
          artistName: selectedSong.artist,
          albumArtworkurl: selectedSong.imageUrl
        }
      })
      if (songInDb) {
        console.log('SONG IS ALREADY IN THE DB', songInDb)
        res.status(204).send('Song is already on the playlist')
      } else {
        const songAddedToDb = await Song.create({
          spotifySongID: selectedSong.songId,
          songName: selectedSong.songName,
          artistName: selectedSong.artist,
          albumArtworkurl: selectedSong.imageUrl,
          playlistId: playlist.id
        })
        const addedToJoinTable = await PlaylistSong.create({
          playlistId: playlist.id,
          songId: songAddedToDb.id
        })
        console.log('NEW SONG IN THE DB', songAddedToDb.dataValues.id)
        const songAddedToReturn = songAddedToDb.dataValues
        res.json(songAddedToReturn)
      }
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:spotifyPlaylistId', async (req, res, next) => {
  try {
    const spotifyPlaylistId = '6UOF0Hq6ffLXnADFQxVKUH'
    const singlePlaylist = await Playlist.findOne({
      where: {
        spotifyPlaylistId: spotifyPlaylistId
      },
      include: [{model: Song}]
    })

    console.log()

    res.json(singlePlaylist)
  } catch (error) {
    next(error)
  }
})
