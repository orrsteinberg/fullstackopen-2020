export const displayNotification = (message) => ({
  type: "DISPLAY_NOTIFICATION",
  data: message,
});

export const clearNotification = (notification) => ({
  type: "CLEAR_NOTIFICATION",
});

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
