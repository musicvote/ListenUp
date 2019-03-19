import axios from 'axios'

//STATE AND REDUCER
const initialState = {
  songs: [],
  currSong: {id: '7uTv9wHkOPh5P9HFmkOE28'},
  deckSong: {id: '7uTv9wHkOPh5P9HFmkOE28'},
  searchResult: ''
}
//ACTION TYPES
const GET_SONGS = 'GET_SONGS'
const GOT_NEXT = 'GOT_NEXT'
const FIND_SONG = 'FIND_SONG'
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

const findSong = song => {
  return {
    type: ADD_SONG,
    searchInput
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

const token =
  'Authorization: Bearer BQCGRAllyK3XMFmE0998kAiZ19GS_kGbe_9qyO8eD30rFyQdRDvjpmZLy5lSSGZAced8EOP-nxicWBDWXEBNoDS90wU1Rd1oxlHopWz-uILYAetJnzRMMc-lyLgSnWIJMpY-2_NzbFOFZ4VkT2Du9OyCk_yTP4BKUDalGQULfBavCQpVboGeD8X9DBadVWBGfc0O0I74fOKZ1a5elSx1nqv6FjXLnzQW1Fq4J3ZfS6_dCun0o3JR9VJGC-Zl95UQGrLVbKuMbDcc1LZD'

export const findSongFromSpotify = searchInput => {
  return async dispatch => {
    const {searchResult} = await axios.get(
      'https://api.spotify.com/v1/search?q=dreams&type=track',
      token
    )
    const action = dispatch(searchResult)
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
    case FIND_SONG: {
      return {
        ...state,
        searchResult: action.searchInput
      }
    }
    default: {
      return state
    }
  }
}

// heartbeat isPlaying checker.

export default playlistReducer
