import React from "react";

const Notification = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <div style={{ color: "red", padding: "20px", border: "1px solid red" }}>
      {errorMessage}
    </div>
  );
};

export default Notification;
