import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Bloglist from './components/Bloglist'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  })

  useEffect(() => {
    const loggedInJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInJSON) {
      const user = JSON.parse(loggedInJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  const login = (user) => {
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
  }

  const handleLogOut = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.clearToken()
  }

  if (!user) {
    return (
      <div>
        <Header title="Log in" notification={notification} />
        <LoginForm login={login} notify={notify} />
      </div>
    )
  }

  return (
    <div>
      <Header title="Blogs" notification={notification} />
      <p>{user.name} logged in</p>
      <button onClick={handleLogOut}>Log out</button>
      <Bloglist user={user} notify={notify} />
    </div>
  )
}

export default App
