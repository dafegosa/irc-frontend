import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import messagesReducer from '../reducers/messagesReducer'
import gifsReducer from '../reducers/gifsReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  combineReducers({
    user: userReducer,
    messages: messagesReducer,
    gifs: gifsReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
)

export default store
