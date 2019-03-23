import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const CREATE_PLAYLIST = 'CREATE_PLAYLIST'
const JOIN_PARTY = 'JOIN_PARTY'


/**
 * INITIAL STATE
 */
const defaultUser = {
  user: {},
  joinedParty: '',
  currentPlaylist: ''

}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const createdPlaylist = playlistUserObj => {
  return {
    type: CREATE_PLAYLIST,
    playlistUserObj
  }
}
export const joinParty = partyCode => ({type: JOIN_PARTY, partyCode})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const addPlaylistToDb = playlistId => {
  return async dispatch => {
    try {
      console.log('defaultUser.id', defaultUser.user.id)
      const {data} = await axios.post(`/api/playlist/create-playlist`, {
        id: playlistId
      })
      console.log('$$$$$defaultUser.user', defaultUser.user.id)

      if (!data) {
        throw error
      } else {
        const action = createdPlaylist(data)
        dispatch(action)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER: {
      return action.user
    }
    case REMOVE_USER: 
      return defaultUser

    case CREATE_PLAYLIST: {
      let newState = {...state, currentPlaylist: action.playlistId}
      console.log('!!!!!!NEW STATE', newState)
      return newState
    }
    case JOIN_PARTY: {
      return {
        ...state,
        joinedParty: action.partyCode
      }
    }
    default:
      return state
  }
}
