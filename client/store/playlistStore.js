import axios from 'axios'
import createHeartbeat from 'redux-heartbeat'

console.log(createHeartbeat(30000))
//STATE AND REDUCER

const initialState = {
  songs: [
    '17eu2pSgSUpIG1GFWBnODv',
    '1BRwuvjhkgezmv1gcI6lT6',
    '4SBQSroThFQ98U29IwnJ2g',
    '3eCofNVG97J3lRyNhh0zPP',
    '65tjr5cWJmsA8KHVvuC7b2'
  ],
  currSong: '',
  deckSong: ''

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
      const {data} = await axios.get(`/api/songs/`)
      console.log(data)
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
    console.log('FROM THE THING: ', data)
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
      return {
        ...state,
        songs: [...state.songs, action.addedSong]
      }
    }
    case FOUND_SONGS: {
      let newState = {
        ...state,
        searchResult: [...action.searchResults]
      }
      console.log(newState)
      return newState
    }
    // case ADD_
    default: {
      console.log('same song state: ', state)
      return state
    }
  }
}

export default playlistReducer
