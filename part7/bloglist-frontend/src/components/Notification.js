import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Alert = styled.div`
  padding: 1rem;
  margin: 2rem auto;
  max-width: 600px;
  font-size: 1.3rem;
  text-align: center;
  background: ${(props) => (props.type === 'success' ? '#22c634' : '#e6172b')};
  color: #fff;
  border-radius: 5px;
`

const Notification = () => {
  const { message, notificationType } = useSelector((state) => state.notification)

  if (!message) {
    return null
  }

  return <Alert type={notificationType}>{message}</Alert>
}

export default Notification
