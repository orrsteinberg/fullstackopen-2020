import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect, useRouteMatch } from 'react-router-dom'
import { Container, Section, SectionTitle, List, ListItem } from '../globalStyles'

const UserPage = () => {
  const {
    params: { id: userIdMatch },
  } = useRouteMatch('/users/:id')
  const userToView = useSelector((state) => state.users.find((u) => u.id === userIdMatch))

  if (!userToView) {
    return <Redirect to="/users" />
  }

  const { name, blogs } = userToView

  return (
    <Container whiteBg>
      <Section>
        <SectionTitle centered big>
          {name}
        </SectionTitle>
        <SectionTitle>Added blogs:</SectionTitle>
        <List>
          {blogs.map(({ id, title }) => (
            <ListItem key={id}>
              <Link to={`/blogs/${id}`}>{title}</Link>
            </ListItem>
          ))}
        </List>
      </Section>
    </Container>
  )
}

export default UserPage
