import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import createHeartbeat from 'redux-heartbeat'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import songs from './playlistStore'
import checkHeartbeat from './middleware'

const reducer = combineReducers({user, songs})
const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    checkHeartbeat,
    createLogger({collapsed: true})
  )
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './playlistStore'
