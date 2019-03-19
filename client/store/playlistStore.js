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

const token = `Authorization: Bearer BQAgkiFvvqTMni2iT3IRHRypwlWAlx4_aN_-TM-uOG31FL4sBtsOOrEwexgEtHyaWTwzbam7GzP0mnrK6LqvQIgDtov-ctdGTrV-RTOfbW8QMX6OmZrRj03wnvpwsZ6y26yqK95RJpb-I1GjGdYhUZpS11LnlLQxYblPCwak_aqej1Qb8-qos2dJvkgPtxZwjsIz2qwAQacz0Mp3AlSExmARBV-kBQGtO9q6nBUyuHl6FCGo5UamTnOFzIqzQTxFmWa8E0m-GQ-mXtqKGfp8M_Zin7uWsIctipw`

export const findSongFromSpotify = searchInput => {
  return async dispatch => {
    const {data} = await axios.get(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=track`,
      {
        method: 'GET',
        headers: {
          authorization: token,
          'Content-Type': 'application/json'
        }
      }
    )

    const allItems = data.tracks.items.reduce((acc, item) => {
      let makeItem = {
        artist: item.artists[0].name,
        songId: item.id,
        songName: item.name
      }
      acc.push(makeItem)
      return acc
    }, [])

    const action = foundFromSearch(allItems)
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
