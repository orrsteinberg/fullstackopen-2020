import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import currentUserReducer from './reducers/currentUserReducer'
import notificationReducer from './reducers/notificationReducer'

const rootReducer = combineReducers({
  blogs: blogReducer,
  users: userReducer,
  currentUser: currentUserReducer,
  notification: notificationReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
