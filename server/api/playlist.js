const router = require('express').Router()
const {Playlist} = require('../db/models/playlist')
module.exports = router

//create a playlist in our DB - when someone clicks "create playlist" - they will send us their playlist URL
router.post('/create-playlist', async (req, res, next) => {
  try {
    playlistId = req.body

    const newPlaylist = await Playlist.Create(playlistId)
    res.status(200).json(newPlaylist)
  } catch (error) {
    next(error)
  }
})
