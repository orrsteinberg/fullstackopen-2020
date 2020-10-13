export const setNotification = (message, duration) => {
  if (window.notificationTimeout) {
    window.clearTimeout(window.notificationTimeout);
  }

  return async (dispatch) => {
    dispatch({
      type: "DISPLAY_NOTIFICATION",
      data: message,
    });

    window.notificationTimeout = setTimeout(
      () =>
        dispatch({
          type: "CLEAR_NOTIFICATION",
        }),
      duration * 1000
    );
  };
};

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "DISPLAY_NOTIFICATION":
      return action.data;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
