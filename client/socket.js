import io from 'socket.io-client'
import store, {getSongs} from './store/playlistStore'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  //socket.on's go here

  socket.on('new-message', refreshedList => {
    store.dispatch(getSongs(refreshedList))
  })
})

export default socket
