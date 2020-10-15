import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import Blog from './Blog'

const Bloglist = () => {
  const blogs = useSelector((state) => state.blogs.sort((a, b) => b.likes - a.likes))
  const user = useSelector((state) => state.currentUser)
  const dispatch = useDispatch()
  const blogFormRef = React.useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <CreateBlogForm />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    </div>
  )
}

export default Bloglist
