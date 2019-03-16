'use strict'

const db = require('../server/db')
const {User, Song} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const songs = await Promise.all([
    Song.create({
      songSpotifyId: '6PCUP3dWmTjcTtXY02oFdT',
      title: 'Castle on the Hill',
      artist: 'Ed Sheeran',
      voteCount: 3
    }),
    Song.create({
      songSpotifyId: '3Du2K5dLzmduCNp6uwuaL0',
      title: 'Sorry Not Sorry',
      artist: 'Demi Lovato',
      voteCount: 2
    }),
    Song.create({
      songSpotifyId: '1uigwk5hNV84zRd5YQQRTk',
      title: 'Pocketful of Sunshine',
      artist: 'Natasha Bedingfield',
      voteCount: 1
    }),
    Song.create({
      songSpotifyId: '7BKLCZ1jbUBVqRi2FVlTVw',
      title: 'Closer',
      artist: 'The Chainsmokers',
      voteCount: 1
    }),
    Song.create({
      songSpotifyId: '1rfofaqEpACxVEHIZBJe6W',
      title: 'Havana',
      artist: 'Camila Cabello',
      voteCount: 0
    })
  ])

  console.log(`seeded ${songs.length} songs successfully!!`)
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
