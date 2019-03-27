import axios from 'axios'
import socket from '../socket'
//STATE AND REDUCER

const initialState = {
  songs: [],
  currSong: {},
  deckSong: {},
  isAdmin: true
}

//ACTION TYPES
const GET_SONGS = 'GET_SONGS'
const GOT_NEXT = 'GOT_NEXT'
const FOUND_SONGS = 'FOUND_SONGS'
const ADDED_SONG = 'ADDED_SONG'
const CREATE_PLAYLIST = 'CREATE_PLAYLIST'
const IS_ADMIN = 'IS_ADMIN'

//ACTION CREATORS
const getSongs = playlist => {
  return {
    type: GET_SONGS,
    playlist
  }
}

const placeNextCurrDeck = newPlacement => {
  return {
    type: GOT_NEXT,
    newPlacement
  }
}

const foundFromSearch = searchResults => {
  return {
    type: FOUND_SONGS,
    searchResults
  }
}

export const addedSongToDb = addedSong => {
  return {
    type: ADDED_SONG,
    addedSong
  }
}
const adminChecked = isAdmin => {
  return {
    type: IS_ADMIN,
    isAdmin
  }
}

const createPlaylist = playlistId => {
  return {
    type: CREATE_PLAYLIST,
    playlistId
  }
}

//THUNK CREATORS
export const fetchPlaylist = playlistId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/songs/${playlistId}`)
      if (!data) {
        return 'No song in the playlist'
      } else {
        const action = getSongs(data.songs)
        socket.emit('new-song', data)
        dispatch(action)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const CheckFetchSpotify = newPlacement => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/songs/getCurrentlyPlaying`)
      //The next/on deck song is playing
      if (data.id !== newPlacement.lastCurrSong.spotifySongID) {
        //Different Song playing
        console.log('Changed Song.')

        const postedSong = await axios.post(`/api/songs/addToPlaylist`, {
          newSong: newPlacement.newDeckSong
        })

        if (postedSong.status === 200) {
          axios.delete(`/api/songs/removeFromPlaylist`, {
            data: {
              lastCurrSongId: newPlacement.lastCurrSong.spotifySongID
            }
          })
        }
        const action = placeNextCurrDeck({
          newCurrSong: newPlacement.newCurrSong,
          newDeckSong: newPlacement.newDeckSong
        })

        dispatch(action)
      } else {
        //Same song playing
        console.log('Same Song.')
        dispatch({type: 'SAME_SONG_PLAYING'})
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const findSongFromSpotify = searchInput => {
  return async dispatch => {
    const {data} = await axios.get(`/api/songs/searchSpotify/${searchInput}`)
    const action = foundFromSearch(data)
    dispatch(action)
  }
}

export const checkIsAdmin = playlistId => {
  return async dispatch => {
    const {data} = await axios.get('/api/playlist/usersPlaylist')

    if (data === playlistId) {
      let actionTrue = adminChecked(true)
      dispatch(actionTrue)
    } else {
      let actionFalse = adminChecked(false)
      dispatch(actionFalse)
    }
  }
}

export const postSongToPlaylist = addedSongObj => {
  return async dispatch => {
    try {
      console.log('!!!!!!!!!!!!!xTHIS IS THE LINE 142')
      let newSong
      const playlistId = '5NASiveas4k209RBgVvH5B'
      const {data} = await axios.post(`/api/songs/${playlistId}/addToDb`, {
        selectedSong: addedSongObj
      })
      console.log(data, 'HELLO THIS IS IN THE POST SONG TO PLAYLIST THUNK')
      newSong = data

      if (!newSong) {
        //Placeholder. this is when the song selected is already on the playlist
        throw Error
      } else {
        console.log(
          data,
          '**************data in the post song to playlist route'
        )
        const action = addedSongToDb(newSong)
        dispatch(action)
        socket.emit('new-song', newSong)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const addPlaylistToDb = playlistId => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/playlist/create-playlist`)
      const action = createPlaylist(data)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

//add song to playlist in our app
const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS: {
      let newState = {
        ...state,
        songs: [...action.playlist]
      }
      initialState.songs = action.playlist
      initialState.currSong = action.playlist[0]
      initialState.deckSong = action.playlist[1]

      return newState
    }
    case IS_ADMIN: {
      let newState = {...state, isAdmin: action.isAdmin}
      return newState
    }
    case GOT_NEXT: {
      let newState = {
        ...state,
        songs: shiftFirstToLast(state.songs),
        currSong: action.newPlacement.newCurrSong,
        deckSong: action.newPlacement.newDeckSong
      }
      return newState
    }
    case ADDED_SONG: {
      let newState = {...state, songs: [...state.songs, action.addedSong]}
      return newState
    }
    case FOUND_SONGS: {
      let newState = {
        ...state,
        searchResult: [...action.searchResults.slice(0, 10)]
      }
      return newState
    }
    // case ADD_
    default: {
      return state
    }
  }
}

function shiftFirstToLast(arrayOfSongs) {
  let firstSong = arrayOfSongs.splice(0, 1)
  arrayOfSongs.push(...firstSong)
  return arrayOfSongs
}

export default playlistReducer
