import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const JOIN_PARTY = 'JOIN_PARTY'
const CREATE_PARTY = 'CREATE_PARTY'

/**
 * INITIAL STATE
 */
const defaultUser = {
  user: {},
  joinedParty: '',
  createdPlaylist: ''
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
export const joinParty = partyCode => ({type: JOIN_PARTY, partyCode})
const createParty = playlistId => {
  return {
    type: CREATE_PARTY,
    playlistId
  }
}

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

export const addedPlaylistToDb = playlistId => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/playlist/create-playlist`, {
        id: playlistId
      })

      if (!data) {
        throw error
      } else {
        const action = createParty(data)
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
    case GET_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return {
        user: {},
        joinedParty: '',
        currentPlaylist: ''
      }
    case JOIN_PARTY: {
      return {
        ...state,
        joinedParty: action.partyCode
      }
    }
    case CREATE_PARTY: {
      return {
        ...state,
        createdPlaylist: action.playlistId
      }
    }
    default:
      return state
  }
}
