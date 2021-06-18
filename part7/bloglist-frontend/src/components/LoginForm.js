import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { loginUser } from '../reducers/currentUserReducer'
import { Container, PageHeader, PageTitle, Card, Button, Input } from '../globalStyles'
import Notification from './Notification'

const LoginForm = () => {
  const [usernameField] = useField('text')
  const [passwordField] = useField('password')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username: usernameField.value, password: passwordField.value }))
  }

  return (
    <Container>
      <PageHeader>
        <PageTitle>Log In</PageTitle>
      </PageHeader>
      <Notification />
      <Card>
        <form onSubmit={handleLogin}>
          <div>
            Username: <Input {...usernameField} />
          </div>
          <div>
            Password: <Input {...passwordField} />
          </div>
          <Button primary type="submit">
            Login
          </Button>
        </form>
      </Card>
    </Container>
  )
}

export default LoginForm
