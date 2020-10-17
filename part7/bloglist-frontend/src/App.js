import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { setCurrentUser, clearCurrentUser } from './reducers/currentUserReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import blogService from './services/blogs'

import Notification from './components/Notification'
import MainHeader from './components/MainHeader'
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

  useEffect(() => {
    // Initialize blogs and users if user is logged in
    if (currentUser) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [dispatch, currentUser])

  const handleLogout = () => {
    blogService.clearToken()
    window.localStorage.clear()
    dispatch(clearCurrentUser())
  }

  if (!currentUser) {
    return <LoginForm />
  }

  return (
    <>
      <MainHeader currentUser={currentUser} handleLogout={handleLogout} />
      <Notification />
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
    </>
  )
}

export default App
