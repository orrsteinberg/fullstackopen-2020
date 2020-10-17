import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect, useRouteMatch } from 'react-router-dom'
import { useField } from '../hooks'
import { Container, Section, SectionTitle, Button, Input } from '../globalStyles'
import { deleteBlog, addLike, addComment } from '../reducers/blogReducer'

const StyledComment = styled.li`
  padding: 0.5rem 1rem;
  list-style-type: square;
  border-bottom: solid 3px #fafafa;
`

const StyledCommentList = styled.ul`
  margin: 1rem;
  padding: 1rem;
`

const CommentForm = ({ handleAddComment }) => {
  const [comment, clearComment] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!comment.value || comment.value.trim() === '') return

    handleAddComment(comment.value)
    clearComment()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input {...comment} />
      <Button primary type="submit">
        Add Comment
      </Button>
    </form>
  )
}

const Comments = ({ blog, handleAddComment }) => (
  <>
    <h3>Comments:</h3>
    <CommentForm handleAddComment={handleAddComment} />
    <StyledCommentList>
      {blog.comments &&
        blog.comments.map((comment, idx) => <StyledComment key={idx}>{comment}</StyledComment>)}
    </StyledCommentList>
  </>
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
    <Container whiteBg>
      <Section>
        <SectionTitle>
          {blog.title} by {blog.author}
        </SectionTitle>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
        <p className="likes">
          {blog.likes} likes
          <Button primary onClick={handleAddLike}>
            Add
          </Button>
        </p>
        <p>
          Added by: <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
        </p>
        {shouldDispayDelete && <Button onClick={handleDelete}>delete</Button>}
      </Section>
      <Comments blog={blog} handleAddComment={handleAddComment} />
    </Container>
  )
}

Comments.propTypes = {
  blog: PropTypes.object.isRequired,
  handleAddComment: PropTypes.func.isRequired,
}

CommentForm.propTypes = {
  handleAddComment: PropTypes.func.isRequired,
}

export default Blog
