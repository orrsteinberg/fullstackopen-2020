import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect, useRouteMatch } from 'react-router-dom'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'

const Blog = () => {
  const blogIdMatch = useRouteMatch('/blogs/:id').params.id
  const blogToView = useSelector((state) => state.blogs.find((b) => b.id === blogIdMatch))
  const currentUser = useSelector((state) => state.currentUser)
  const dispatch = useDispatch()

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blogToView.title} by ${blogToView.author}?`)) {
      dispatch(deleteBlog(blogToView.id))
    }
  }

  const handleAddLike = () => {
    dispatch(updateBlog({ ...blogToView, likes: blogToView.likes + 1 }))
  }

  if (!blogToView) {
    return <Redirect to="/" />
  }

  const shouldDispayDelete = blogToView.user.username === currentUser.username

  return (
    <div>
      <div>
        <h1>
          {blogToView.title} by {blogToView.author}
        </h1>
        <p>{blogToView.url}</p>
        <p className="likes">
          {blogToView.likes} likes
          <button onClick={handleAddLike}>Add</button>
        </p>
        <p>
          Added by: <Link to={`/users/${blogToView.user.id}`}>{blogToView.user.name}</Link>
        </p>
        {shouldDispayDelete && <button onClick={handleDelete}>delete</button>}
      </div>
      <h2>Comments:</h2>
    </div>
  )
}

export default Blog
