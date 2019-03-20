const User = require('./user')
const Song = require('./song')
const Playlist = require('./playlist')

Playlist.belongsTo(User)
User.hasOne(Playlist)

Playlist.belongsToMany(Song, {through: 'Playlist_song'})
Song.belongsToMany(Playlist, {through: 'Playlist_song'})

module.exports = {
  User,
  Song,
  Playlist
}
