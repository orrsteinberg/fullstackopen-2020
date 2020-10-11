import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import Blog from './Blog'

const Bloglist = ({ user, notify }) => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = React.useRef()

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const blogsFromApi = await blogService.getAll()
      setBlogs(blogsFromApi.sort((a, b) => b.likes - a.likes))
    }
    fetchAllBlogs()
  }, [])

  const createNewBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      // Update list of blogs
      setBlogs(blogs.concat(returnedBlog))

      // Hide new blog form
      blogFormRef.current.toggleVisibility()

      notify({
        message: `New blog created: ${returnedBlog.title} by ${returnedBlog.author}`,
        type: 'success',
      })
    } catch (error) {
      notify({
        message: 'Could not create a new blog entry',
        type: 'error',
      })
    }
  }

  const updateBlog = async (blogId, blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogId, blogObject)

      // Update blog list
      const updatedBlogs = blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))

      // Set updated blogs state, sort by number of likes
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))

      notify({
        message: `Added a like for ${updatedBlog.title}`,
        type: 'success',
      })
    } catch (error) {
      notify({
        message: 'Could not update blog',
        type: 'error',
      })
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      const response = await blogService.remove(blogId)

      if (response.status === 204) {
        // If it was removed on the server, remove blog from the list of blogs
        setBlogs(blogs.filter((b) => b.id !== blogId))

        notify({
          message: 'Successfully removed blog',
          type: 'success',
        })
      } else {
        notify({
          message: 'Could not delete blog',
          type: 'error',
        })
      }
    } catch (error) {
      notify({
        message: 'Could not delete blog',
        type: 'error',
      })
    }
  }

  return (
    <div>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <CreateBlogForm createNewBlog={createNewBlog} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    </div>
  )
}

Bloglist.propTypes = {
  user: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired,
}

export default Bloglist
