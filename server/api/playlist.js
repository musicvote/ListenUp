const router = require('express').Router()
const {Playlist, User} = require('../db/models')
module.exports = router

//create a playlist in our DB - when someone clicks "create playlist" - they will send us their playlist URL

router.post('/create-playlist', async (req, res, next) => {
  try {
    const playlistId = req.body.id
    const userId = req.user.id

    console.log('REQ.USER', req.user)

    // console.log('playlistId!!!!!!', playlistId)
    // console.log('USERID%%%%', userId)
    const matchedUser = await User.findOne({where: {id: userId}})
    // console.log('!!!!!!!!!@@@@@ matchedUser', matchedUser)

    const newPlaylist = await Playlist.create({
      spotifyPlaylistId: playlistId,
      userId: matchedUser.id
    })
    console.log('NEW PLAYLIST :)))', newPlaylist)
    res.status(200).json(newPlaylist)
  } catch (error) {
    console.log('error', error)
  }
})
