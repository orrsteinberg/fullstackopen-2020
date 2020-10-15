import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { createBlog } from '../reducers/blogReducer'

import Header from './Header'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs.sort((a, b) => b.likes - a.likes))
  const dispatch = useDispatch()
  // Ref toggleable component to access its toggle function on new blog creation
  const blogFormRef = React.useRef()

  const handleCreateBlog = ({ title, author, url }) => {
    dispatch(createBlog({ title, author, url }))
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <Header title="Blogs" />
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <CreateBlogForm createBlog={handleCreateBlog} />
      </Togglable>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}/`}>
              <b>{blog.title}</b> by {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
