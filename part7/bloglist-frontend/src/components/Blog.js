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
  const [commentField, clearCommentField] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!commentField.value || commentField.value.trim() === '') return

    handleAddComment(commentField.value)
    clearCommentField()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input {...commentField} />
      <Button primary type="submit">
        Add Comment
      </Button>
    </form>
  )
}

const Comments = ({ comments, handleAddComment }) => (
  <>
    <h3>Comments:</h3>
    <CommentForm handleAddComment={handleAddComment} />
    <StyledCommentList>
      {comments &&
        comments.map((comment, idx) => <StyledComment key={idx}>{comment}</StyledComment>)}
    </StyledCommentList>
  </>
)

const Blog = () => {
  const {
    params: { id: blogIdMatch },
  } = useRouteMatch('/blogs/:id')
  const blog = useSelector((state) => state.blogs.find((b) => b.id === blogIdMatch))
  const currentUser = useSelector((state) => state.currentUser)
  const dispatch = useDispatch()

  if (!blog) {
    return <Redirect to="/" />
  }

  const { id, url, title, author, likes, user, comments } = blog

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      dispatch(deleteBlog(id))
    }
  }

  const handleAddLike = () => {
    dispatch(addLike(blog))
  }

  const handleAddComment = (comment) => {
    dispatch(addComment({ ...blog, comments: [...comments, comment] }))
  }
  const shouldDispayDelete = user.username === currentUser.username

  return (
    <Container whiteBg>
      <Section>
        <SectionTitle>
          {title} by {author}
        </SectionTitle>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
        <p className="likes">
          {likes} likes
          <Button primary onClick={handleAddLike}>
            Add
          </Button>
        </p>
        <p>
          Added by: <Link to={`/users/${user.id}`}>{user.name}</Link>
        </p>
        {shouldDispayDelete && <Button onClick={handleDelete}>delete</Button>}
      </Section>
      <Comments comments={comments} handleAddComment={handleAddComment} />
    </Container>
  )
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  handleAddComment: PropTypes.func.isRequired,
}

CommentForm.propTypes = {
  handleAddComment: PropTypes.func.isRequired,
}

export default Blog
