import axios from 'axios'
import createHeartbeat from 'redux-heartbeat'

console.log(createHeartbeat(30000))
//STATE AND REDUCER

export const initialState = {
  songs: [],
  currSong: {id: '7uTv9wHkO Ph5P9HFmkOE28'},
  deckSong: {id: '7uTv9wHkOPh5P9HFmkOE28'},
  searchResult: []

}

//ACTION TYPES
const GET_SONGS = 'GET_SONGS'
const GOT_NEXT = 'GOT_NEXT'
const FOUND_SONGS = 'FOUND_SONGS'
const ADDED_SONG = 'ADDED_SONG'

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
      console.log('7777777777: ', data.body.item.id)

      if (data.body.item.id !== initialState.songs[0]) {
        //Different Song playing
        console.log('Song Changed!')

        initialState.songs.shift()
        let newDeckSong = initialState.songs[1]
        let newCurrSong = initialState.songs[0]
        console.log('third song: ', initialState.songs[2])

        await axios.post(`/api/songs/addToPlaylist`, {
          id: initialState.songs[2]
        })

        const action = placeNextCurrDeck({newCurrSong, newDeckSong})
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

//add song to playlist in our app
const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS: {
      let newState = {
        ...state,
        //songs: [...action.playlist],
        currSong: state.songs[0],
        deckSong: state.songs[1]
      }
      console.log(newState)
      return newState
    }
    case GOT_NEXT: {
      let newState = {
        ...state,
        currSong: action.newPlacement.newCurrSong,
        deckSong: action.newPlacement.newDeckSong
      }
      console.log(newState)
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
    default: {
      console.log('same song state: ', state)
      return state
    }
  }
}

export default playlistReducer
