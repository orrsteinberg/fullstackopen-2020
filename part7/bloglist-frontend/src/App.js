import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { setCurrentUser, clearCurrentUser } from './reducers/currentUserReducer'

import blogService from './services/blogs'
import Header from './components/Header'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'

const App = () => {
  const currentUser = useSelector((state) => state.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    // Check if user is already logged in
    const userInLocalStorage = window.localStorage.getItem('loggedInUser')

    if (userInLocalStorage) {
      const user = JSON.parse(userInLocalStorage)
      blogService.setToken(user.token)
      dispatch(setCurrentUser(user))
    }
  }, [dispatch])

  const handleLogout = () => {
    blogService.clearToken()
    window.localStorage.clear()
    dispatch(clearCurrentUser())
  }

  if (!currentUser) {
    return (
      <div>
        <Header title="Log in" />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <p>{currentUser.name} logged in</p>
      <button onClick={handleLogout}>Log out</button>
      <Switch>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Blogs />
        </Route>
      </Switch>
    </div>
  )
}

export default App
