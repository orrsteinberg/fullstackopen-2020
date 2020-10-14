import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  const { message, type } = notification

  if (!message) {
    return null
  }

  return <div className={type}>{message}</div>
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
}

export default Notification
