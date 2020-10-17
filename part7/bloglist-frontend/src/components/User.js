import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect, useRouteMatch } from 'react-router-dom'
import { Container, Section, SectionTitle, List, ListItem } from '../globalStyles'

const UserPage = () => {
  const userIdMatch = useRouteMatch('/users/:id').params.id
  const userToView = useSelector((state) => state.users.find((u) => u.id === userIdMatch))

  if (!userToView) {
    return <Redirect to="/users" />
  }

  return (
    <Container whiteBg>
      <Section>
        <SectionTitle centered big>
          {userToView.name}
        </SectionTitle>
        <SectionTitle>Added blogs:</SectionTitle>
        <List>
          {userToView.blogs.map((blog) => (
            <ListItem key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListItem>
          ))}
        </List>
      </Section>
    </Container>
  )
}

export default UserPage
