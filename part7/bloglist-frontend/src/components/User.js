import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect, useRouteMatch } from 'react-router-dom'

const UserPage = () => {
  const userIdMatch = useRouteMatch('/users/:id').params.id
  const userToView = useSelector((state) => state.users.find((u) => u.id === userIdMatch))

  if (!userToView) {
    return <Redirect to="/users" />
  }

  return (
    <div>
      <h1>{userToView.name}</h1>
      <h3>Added blogs:</h3>
      <ul>
        {userToView.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
