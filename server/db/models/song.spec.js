const {expect} = require('chai')
const db = require('../index')
const Song = db.model('song')

describe('Song model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Songs ', () => {
    describe('correct attributes of name', () => {
      let song

      beforeEach(async () => {
        song = await Song.build({
          spotifySongID: '6PCUP3dWmTjcTtXY02oFdT',
          songName: 'Castle on the Hill',
          artistName: 'Ed Sheeran',
          albumArtworkurl:
            'https://i.scdn.co/image/6f2621d1552021fd87898d69899e214c0a977417'
        })
      })

      it('includes a spotify song id from spotify attribute', () => {
        expect(song.spotifySongID).to.be.equal('6PCUP3dWmTjcTtXY02oFdT')
      })

      it('includes a song name as a string', () => {
        expect(song.songName).to.be.equal('Castle on the Hill')
      })
      it('includes an Artist name as a string', () => {
        expect(song.artistName).to.be.equal('Ed Sheeran')
      })
      it('includes imageUrl attribute', () => {
        expect(song.albumArtworkurl).to.be.equal(
          'https://i.scdn.co/image/6f2621d1552021fd87898d69899e214c0a977417'
        )
      })
    })
  })
}) // end describe('User model')
