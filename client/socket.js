import io from 'socket.io-client'
import store, {addedSongToDb} from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  //socket.on's go here

  socket.on('new-song', song => {
    store.dispatch(addedSongToDb(song))
  })
  socket.on('update_vote', vote => {
    store.dispatch(addedSongToDb(vote))
  })
})

export default socket
