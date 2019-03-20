import axios from 'axios'

//STATE AND REDUCER
export const initialState = {
  songs: [],
  currSong: {id: '7uTv9wHkOPh5P9HFmkOE28'},
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

const addSongToDb = addedSong => {
  return {
    type: FOUND_SONGS,
    addedSong
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

const token = `BQAStW6Niib8tsmR_6h2mb29FO0Yl01QV8mqrfm0amp1gvjDDMRlhMZa1j94PyGuCLAdyC9zz9DGxd7BAD9jxhuQ15CIt_E28uUbgpGnYk-KNrD8_Z1EW6IzPT89IvxccwnmP8kBKeIGB0Mu2XIYXXf8s5Lbas57Qgs-A7C87o7Xvx93FKZtMn_yY2NoOz6GhWwYkw2AsiWAuyVSATf234EdQNP7xZzkVCJ35yKZMUAiGij4ejW4TP1C_0I7Rp09AxcTYNGoT-3mGEtaF0-0VbPQT_IeDdLz6j0`

export const findSongFromSpotify = searchInput => {
  return async dispatch => {
    const {data} = await axios.post(`/api/songs/search-song`, {
      search: searchInput
    })

    const allItems = data.tracks.items.reduce((acc, item) => {
      let makeItem = {
        label: `${item.artists[0].name} - ${item.name}`,
        value: item.id
      }
      acc.push(makeItem)
      return acc
    }, [])

    const action = foundFromSearch(allItems)
    dispatch(action)
  }
}

export const postSongToPlaylist = searchInput => {
  return async dispatch => {
    const action = addSongToDb(allItems)
    dispatch(action)
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
    case FOUND_SONGS: {
      let newState = {
        ...state,
        searchResult: [...action.searchResults]
      }
      console.log(newState)
      return newState
    }
    default: {
      return state
    }
  }
}

// heartbeat isPlaying checker.

export default playlistReducer
