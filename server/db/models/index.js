const User = require('./user')
const Song = require('./song')
const Playlist = require('./playlist')

Playlist.belongsTo(User)
User.hasOne(Playlist)

Playlist.belongsToMany(Song, {through: 'playlist_song'})
Song.belongsToMany(Playlist, {through: 'playlist_song'})

module.exports = {
  User,
  Song,
  Playlist
}
