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
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Castle_On_The_Hill_%28Official_Single_Cover%29_by_Ed_Sheeran.png/220px-Castle_On_The_Hill_%28Official_Single_Cover%29_by_Ed_Sheeran.png'
    }),
    Song.create({
      spotifySongID: '3Du2K5dLzmduCNp6uwuaL0',
      songName: 'Sorry Not Sorry',
      artistName: 'Demi Lovato',
      albumArtworkurl:
        'https://m.media-amazon.com/images/I/51ziXg-upfL._AA256_.jpg'
    }),
    Song.create({
      spotifySongID: '1uigwk5hNV84zRd5YQQRTk',
      songName: 'Pocketful of Sunshine',
      artistName: 'Natasha Bedingfield',
      albumArtworkurl:
        'https://c-sf.smule.com/sf/s21/arr/21/3f/ffea4bf2-d0b1-41af-a359-da25380595bc.jpg'
    }),
    Song.create({
      spotifySongID: '7BKLCZ1jbUBVqRi2FVlTVw',
      songName: 'Closer',
      artistName: 'The Chainsmokers',
      albumArtworkurl:
        'https://m.media-amazon.com/images/I/51gY5b2UJAL._AA256_.jpg'
    }),
    Song.create({
      spotifySongID: '1rfofaqEpACxVEHIZBJe6W',
      songName: 'Havana',
      artistName: 'Camila Cabello',
      albumArtworkurl:
        'https://c-sf.smule.com/sf/s77/arr/c4/ff/c6d40372-0986-40fc-b2e0-9ef9b73c79d7.jpg'
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
