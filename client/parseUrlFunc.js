export default function parseSpotifyUrl(url) {
  if (typeof url === 'string') {
    let splitArr = url.split('playlist/')
    if (!splitArr[0].includes('user')) return splitArr[1]
    else {
      return splitArr[1].split('?si=')[0]
    }
  }
}
