export const setNotification = (message, notificationType) => {
  // Saving timeout id on the global window object so it can be cleared directly
  if (window._bloglistNotificationTimeout) {
    window.clearTimeout(window._bloglistNotificationTimeout)
  }

  return async (dispatch) => {
    dispatch({ type: 'DISPLAY_NOTIFICATION', data: { message, notificationType } })

    window._bloglistNotificationTimeout = setTimeout(
      () => dispatch({ type: 'CLEAR_NOTIFICATION' }),
      5000
    )
  }
}

const initialState = {
  message: null,
  notificationType: null,
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DISPLAY_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return {
        message: null,
        notificationType: null,
      }

    default:
      return state
  }
}

export default notificationReducer
