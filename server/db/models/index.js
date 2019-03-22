const User = require('./user')
const Song = require('./song')
const Playlist = require('./playlist')
const PlaylistSong = require('./PlaylistSong')

Playlist.belongsTo(User)
User.hasOne(Playlist)

Playlist.belongsToMany(Song, {through: PlaylistSong})
Song.belongsToMany(Playlist, {through: PlaylistSong})

module.exports = {
  User,
  Song,
  Playlist,
  PlaylistSong
}
