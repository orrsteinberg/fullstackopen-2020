import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { initializeBlogs, createBlog } from '../reducers/blogReducer'

import Header from './Header'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'

const Bloglist = () => {
  const blogs = useSelector((state) => state.blogs.sort((a, b) => b.likes - a.likes))
  const dispatch = useDispatch()
  const blogFormRef = React.useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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

export default Bloglist
