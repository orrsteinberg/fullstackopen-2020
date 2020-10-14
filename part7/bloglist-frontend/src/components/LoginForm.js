import React, { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'

const LoginForm = ({ login, notify }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      login(user)

      notify({
        message: `${user.name} logged in`,
        type: 'success',
      })
    } catch (error) {
      notify({
        message: 'Wrong username or password',
        type: 'error',
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username:{' '}
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:{' '}
          <input
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-btn" type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
}
export default LoginForm
