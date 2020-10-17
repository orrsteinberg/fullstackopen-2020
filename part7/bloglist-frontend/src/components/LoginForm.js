import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { loginUser } from '../reducers/currentUserReducer'
import { Container, PageHeader, PageTitle, Card, Button, Input } from '../globalStyles'
import Notification from './Notification'

const LoginForm = () => {
  const [username] = useField('text')
  const [password] = useField('password')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username: username.value, password: password.value }))
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
            Username: <Input {...username} />
          </div>
          <div>
            Password: <Input {...password} />
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
