'use strict'

const db = require('../server/db')
const {User, Song, Playlist, PlaylistSong} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({spotifyId: 1, email: 'cody@email.com', password: '123'}),
    User.create({spotifyId: 2, email: 'murphy@email.com', password: '123'})
  ])

  const playlist = await Promise.all([
    Playlist.create({
      spotifyId: 1,
      spotifyPlaylistId: '6UOF0Hq6ffLXnADFQxVKUH'
    })
  ])

  const songs = await Promise.all([
    Song.create({
      spotifySongID: '6PCUP3dWmTjcTtXY02oFdT',
      songName: 'Castle on the Hill',
      artistName: 'Ed Sheeran',
      albumArtworkurl:
        'https://i.scdn.co/image/6f2621d1552021fd87898d69899e214c0a977417'
    }),
    Song.create({
      spotifySongID: '3Du2K5dLzmduCNp6uwuaL0',
      songName: 'Sorry Not Sorry',
      artistName: 'Demi Lovato',
      albumArtworkurl:
        'https://i.scdn.co/image/08a57cb98fc4cf781c064124630f99524e62a312'
    }),
    Song.create({
      spotifySongID: '1uigwk5hNV84zRd5YQQRTk',
      songName: 'Pocketful of Sunshine',
      artistName: 'Natasha Bedingfield',
      albumArtworkurl:
        'https://i.scdn.co/image/014f38920ba75a4efd3488b4626cf6e16f94c9e5'
    }),
    Song.create({
      spotifySongID: '7BKLCZ1jbUBVqRi2FVlTVw',
      songName: 'Closer',
      artistName: 'The Chainsmokers',
      albumArtworkurl:
        'https://i.scdn.co/image/57ba46d39d710e99ae524b279cae3a3981ace43f'
    }),
    Song.create({
      spotifySongID: '1rfofaqEpACxVEHIZBJe6W',
      songName: 'Havana',
      artistName: 'Camila Cabello',
      albumArtworkurl:
        'https://i.scdn.co/image/014f38920ba75a4efd3488b4626cf6e16f94c9e5'
    })
  ])

  const playlistSong = await Promise.all([
    PlaylistSong.create({
      playlistId: 1,
      songId: 1,
      spotifyPlaylistId: '6UOF0Hq6ffLXnADFQxVKUH',
      songSpotifySongID: '6PCUP3dWmTjcTtXY02oFdT'
    }),
    PlaylistSong.create({
      playlistId: 1,
      songId: 2,
      spotifyPlaylistId: '6UOF0Hq6ffLXnADFQxVKUH',
      songSpotifySongID: '1uigwk5hNV84zRd5YQQRTk'
    }),
    PlaylistSong.create({
      playlistId: 1,
      songId: 3,
      spotifyPlaylistId: '6UOF0Hq6ffLXnADFQxVKUH',
      songSpotifySongID: '3Du2K5dLzmduCNp6uwuaL0'
    }),
    PlaylistSong.create({
      playlistId: 1,
      songId: 4,
      spotifyPlaylistId: '6UOF0Hq6ffLXnADFQxVKUH',
      songSpotifySongID: '7BKLCZ1jbUBVqRi2FVlTVw'
    }),
    PlaylistSong.create({
      playlistId: 1,
      songId: 5,
      spotifyPlaylistId: '6UOF0Hq6ffLXnADFQxVKUH',
      songSpotifySongID: '1rfofaqEpACxVEHIZBJe6W'
    })
  ])

  console.log(`seeded songs successfully!!`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
