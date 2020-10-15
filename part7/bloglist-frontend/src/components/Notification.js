import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, notificationType } = useSelector((state) => state.notification)

  if (!message) {
    return null
  }

  return <div className={notificationType}>{message}</div>
}

export default Notification
