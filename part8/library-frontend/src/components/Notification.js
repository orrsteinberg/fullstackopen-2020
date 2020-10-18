import React from "react";

const Notification = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <div style={{ padding: "20px", border: "1px solid #222" }}>
      {errorMessage}
    </div>
  );
};

export default Notification;
