import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const BlogDetails = ({ blog, user, handleAddLike, handleDelete }) => {
  const isOwnedByUser = user.username === blog.user.username

  return (
    <div className="blog-details">
      <p>{blog.url}</p>
      <p className="likes">
        {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
        <button onClick={handleAddLike}>Add</button>
      </p>
      <p>{blog.user.name}</p>
      {isOwnedByUser && <button onClick={handleDelete}>delete</button>}
    </div>
  )
}

const Blog = ({ blog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const handleAddLike = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  return (
    <div className="blog">
      <span className="blog-title">
        <b>{blog.title}</b>
      </span>{' '}
      <span className="blog-author">{blog.author}</span>{' '}
      <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails ? (
        <BlogDetails
          blog={blog}
          user={user}
          handleAddLike={handleAddLike}
          handleDelete={handleDelete}
        />
      ) : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleAddLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog
