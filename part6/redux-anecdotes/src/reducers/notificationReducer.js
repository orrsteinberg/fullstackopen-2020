export const setNotification = (message, duration) => {
  if (window._anecdotesNotificationTimeout) {
    window.clearTimeout(window._anecdotesNotificationTimeout);
  }

  return async (dispatch) => {
    dispatch({
      type: "DISPLAY_NOTIFICATION",
      data: message,
    });

    window._anecdotesNotificationTimeout = setTimeout(
      () =>
        dispatch({
          type: "CLEAR_NOTIFICATION",
        }),
      duration * 1000
    );
  };
};

const notificationReducer = (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case "DISPLAY_NOTIFICATION":
      return data;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
