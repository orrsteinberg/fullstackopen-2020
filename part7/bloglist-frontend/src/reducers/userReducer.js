import userService from '../services/users'
import { setNotification } from './notificationReducer'

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll()
      dispatch({ type: 'INIT_USERS', data: users })
    } catch (error) {
      setNotification('Error fetching list of users', 'error')
    }
  }
}

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export default userReducer
