const User = require('./user')
const Song = require('./song')
const Playlist = require('./playlist')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// Song.belongsTo(Playlist)
// Playlist.hasMany(Song)
// Playlist.belongsTo(User)
// User.hasOne(Playlist)

// Playlist.hasMany(Song)
// Song.hasMany(Playlist)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Song,
  Playlist
}
