import axios from 'axios'
import createHeartbeat from 'redux-heartbeat'
import socket from '../socket'
//STATE AND REDUCER

const initialState = {
  songs: [],
  currSong: {},
  deckSong: {}
}

//ACTION TYPES
const GET_SONGS = 'GET_SONGS'
const GOT_NEXT = 'GOT_NEXT'
const FOUND_SONGS = 'FOUND_SONGS'
const ADDED_SONG = 'ADDED_SONG'
const CREATE_PLAYLIST = 'CREATE_PLAYLIST'

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

const addedSongToDb = addedSong => {
  return {
    type: ADDED_SONG,
    addedSong
  }
}

const createPlaylist = playlistId => {
  return {
    type: CREATE_PLAYLIST,
    playlistId
  }
}

//THUNK CREATORS
export const fetchPlaylist = () => {
  return async dispatch => {
    try {
      //hardcoded for DEV
      const playlistId = '6UOF0Hq6ffLXnADFQxVKUH'

      const {data} = await axios.get(`/api/songs/${playlistId}`)
      const action = getSongs(data)
      socket.emit('new-song', data)
      dispatch(action)
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
        console.log('Changed Song.')
        //Different Song playing
        await axios.post(`/api/songs/addToPlaylist`, {
          newSong: newPlacement.newDeckSong
        })

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

export const postSongToPlaylist = addedSongObj => {
  return async dispatch => {
    try {
      const playlistId = '6UOF0Hq6ffLXnADFQxVKUH'
      const {data} = await axios.post(`/api/songs/:${playlistId}/addToDb`, {
        selectedSong: addedSongObj
      })

      const action = addedSongToDb(data)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

export const addPlaylistToDb = playlistId => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/create-playlist`)
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
      let newState = {
        ...state,
        songs: [...state.songs, action.addedSong[0]]
      }
      return newState
    }
    case FOUND_SONGS: {
      let newState = {
        ...state,
        searchResult: [...action.searchResults]
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
