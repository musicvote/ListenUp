export default function parseSpotifyUrl(url) {
  if (typeof url === 'string') {
    if (url.length <= 22) return url
    else {
      let splitArr = url.split('playlist/')

      if (!splitArr[0].includes('user')) return splitArr[1]
      else {
        return splitArr[1].split('?si=')[0]
      }
    }
  }
}

// handleSubmit(event) {
//   event.preventDefault()
//   this.props.addedPlaylistToDb(this.state.newPlaylistId)
//   if (this.state.newPlaylistId.length === 22) {
//     this.props.addedPlaylistToDb(this.state.newPlaylist)
//   } else {
//     const parsedUrl = parseSpotifyUrl(this.state.newPlaylist)
//     this.props.addedPlaylistToDb(parsedUrl)
//   }
// }
