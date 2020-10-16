import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect, useRouteMatch } from 'react-router-dom'
import { useField } from '../hooks'
import { deleteBlog, addLike, addComment } from '../reducers/blogReducer'

const CommentForm = ({ handleAddComment }) => {
  const [comment, clearComment] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAddComment(comment.value)
    clearComment()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input {...comment} />
      <button type="submit">Add Comment</button>
    </form>
  )
}

const Comments = ({ blog, handleAddComment }) => (
  <div>
    <h2>Comments:</h2>
    <CommentForm handleAddComment={handleAddComment} />
    <ul>{blog.comments && blog.comments.map((comment, idx) => <li key={idx}>{comment}</li>)}</ul>
  </div>
)

const Blog = () => {
  const blogIdMatch = useRouteMatch('/blogs/:id').params.id
  const blog = useSelector((state) => state.blogs.find((b) => b.id === blogIdMatch))
  const currentUser = useSelector((state) => state.currentUser)
  const dispatch = useDispatch()

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const handleAddLike = () => {
    dispatch(addLike({ ...blog, likes: blog.likes + 1 }))
  }

  const handleAddComment = (comment) => {
    dispatch(addComment({ ...blog, comments: [...blog.comments, comment] }))
  }

  if (!blog) {
    return <Redirect to="/" />
  }

  const shouldDispayDelete = blog.user.username === currentUser.username

  return (
    <div>
      <div>
        <h1>
          {blog.title} by {blog.author}
        </h1>
        <p>{blog.url}</p>
        <p className="likes">
          {blog.likes} likes
          <button onClick={handleAddLike}>Add</button>
        </p>
        <p>
          Added by: <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
        </p>
        {shouldDispayDelete && <button onClick={handleDelete}>delete</button>}
      </div>
      <Comments blog={blog} handleAddComment={handleAddComment} />
    </div>
  )
}

export default Blog
