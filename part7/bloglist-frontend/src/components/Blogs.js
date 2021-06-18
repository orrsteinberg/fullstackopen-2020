import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { createBlog } from '../reducers/blogReducer'
import { Container, PageHeader, PageTitle, List, ListItem } from '../globalStyles'
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
    <Container whiteBg>
      <PageHeader whiteBg>
        <PageTitle>Blogs</PageTitle>
      </PageHeader>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <CreateBlogForm createBlog={handleCreateBlog} />
      </Togglable>
      <List>
        {blogs.map(({ id, title, author }) => (
          <ListItem key={id}>
            <Link to={`/blogs/${id}/`}>
              <b>{title}</b> by {author}
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default Blogs
