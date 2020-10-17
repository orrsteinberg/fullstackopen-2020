import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const checkCurrentUser = () => {
  return (dispatch) => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setCurrentUser(user))
    }
  }
}

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      // Set auth token and localStorage info
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      dispatch(setCurrentUser(user))
    } catch (error) {
      dispatch(setNotification('Wrong username or password', 'error'))
    }
  }
}

export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    data: user,
  }
}

export const clearCurrentUser = () => {
  return { type: 'CLEAR_CURRENT_USER' }
}

const currentUserReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_CURRENT_USER':
    return action.data
  case 'CLEAR_CURRENT_USER':
    return null
  default:
    return state
  }
}

export default currentUserReducer
