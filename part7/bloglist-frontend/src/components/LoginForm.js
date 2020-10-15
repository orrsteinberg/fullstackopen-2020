import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { loginUser } from '../reducers/currentUserReducer'

const LoginForm = () => {
  const [username] = useField('text')
  const [password] = useField('password')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username: username.value, password: password.value }))
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username: <input {...username} />
        </div>
        <div>
          Password: <input {...password} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
