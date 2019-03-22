import axios from 'axios'

//STATE AND REDUCER
export const initialState = {
  songs: [],
  currSong: {id: '7uTv9wHkO Ph5P9HFmkOE28'},
  deckSong: {id: '7uTv9wHkOPh5P9HFmkOE28'},
  searchResult: [],
  playlists: []
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

const gotNext = spotifyPlaying => {
  return {
    type: GOT_NEXT,
    spotifyPlaying
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
      return state
    }
  }
}

export default playlistReducer
