import axios from 'axios'

//STATE AND REDUCER
const initialState = {
  songs: [],
  currSong: {id: '7uTv9wHkOPh5P9HFmkOE28'},
  deckSong: {id: '7uTv9wHkOPh5P9HFmkOE28'}
}
//ACTION TYPES
const GET_SONGS = 'GET_SONGS'
const GOT_NEXT = 'GOT_NEXT'
//ACTION CREATORS
const getSongs = playlist => {
  return {
    type: GET_SONGS,
    playlist
  }
}

const gotNext = spotifyPlaying => {
  return {
    type: GOT_NEXT,
    spotifyPlaying
  }
}

//THUNK CREATORS
export const fetchPlaylist = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/songs/`)
      const action = getSongs(data)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

export const CheckFetchSpotify = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/songs/getCurrentlyPlaying`)
      //The next/on deck song is playing
      if (data === initialState.deckSong.id) {
        //Same song is still playing
        //hits reducer's defalt may not be needed but this will just keep the same state.
        console.log('Same Song.')
        dispatch({type: 'SAME_SONG_PLAYING'})
      } else {
        console.log('Song Changed!')
        const {data} = await axios.post(`/api/songs/addToPlaylist`, {
          id: `5zhnwbZWsbfJFNcrdO3LYB`
        })
        console.log('got here', data.body)

        const action = gotNext(data.body)
        dispatch(action)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS: {
      return {
        ...state,
        songs: [...action.playlist]
      }
    }
    case GOT_NEXT: {
      return {
        ...state,
        currSong: action.spotifyPlaying
      }
    }
    default: {
      return state
    }
  }
}

// heartbeat isPlaying checker.

export default playlistReducer
