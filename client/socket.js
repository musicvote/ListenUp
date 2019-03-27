import io from 'socket.io-client'
import store from './store'
import {addedSongToDb} from './store/playlistStore'
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  //socket.on's go here
  socket.on('new-song', song => {
    if (!song.songs) store.dispatch(addedSongToDb(song))
  })
})

export default socket
