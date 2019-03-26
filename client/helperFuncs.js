export default function parseSpotifyUrl(url) {
  if (typeof url === 'string') {
    let splitArr = url.split('playlist/')
    if (!splitArr[0].includes('user')) return splitArr[1]
    else {
      return splitArr[1].split('?si=')[0]
    }
  }
}

export function shiftFirstToLast(arrayOfSongs) {
  let firstSong = arrayOfSongs.splice(0, 1)
  arrayOfSongs.push(...firstSong)
  return arrayOfSongs
}

//orders songs by vote count
export function reorderSongs(songArr, num) {
  return songArr.map(elem => {
    if (elem.id === num) {
      elem.vote++
    }
    return elem
  })
}

//increases votes per song
export function increaseVoteForSong(songArr, num) {
  return songArr.map(elem => {
    if (elem.id === num) {
      elem.vote++
    }
    return elem
  })
}
