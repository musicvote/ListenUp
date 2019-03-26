const router = require('express').Router()
const {Playlist, User} = require('../db/models')
module.exports = router

//create a playlist in our DB - when someone clicks "create playlist" - they will send us their playlist URL

router.get('/usersPlaylist', async (req, res, next) => {
  try {
    const userId = req.user.id
    const playlist = await Playlist.findOne({where: {userId}})

    res.status(200).json(playlist.dataValues.spotifyPlaylistId)
  } catch (error) {
    console.log('error', error)
  }
})

router.post('/create-playlist', async (req, res, next) => {
  try {
    const playlistId = req.body.id
    const userId = req.user.id

    const newPlaylist = await Playlist.findOrCreate({
      where: {
        spotifyPlaylistId: playlistId,
        userId
      }
    })

    res.status(200).json(newPlaylist[0])
  } catch (error) {
    console.log('error', error)
  }
})
