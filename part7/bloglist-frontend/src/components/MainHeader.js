import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../globalStyles'

const MainHeaderWrapper = styled.header`
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`

const MainHeaderNav = styled.nav`
  & a {
    font-size: 1.3rem;
    color: #384ebf;
    margin-left: 1rem;
    display: inline-block;
    padding: 1rem;
    text-decoration: none;

    &:hover {
      background: #384ebf;
      color: #fff;
    }
  }
`

const Logo = styled.h2`
  color: #f21f82;
  letter-spacing: -1px;
`

const MainHeader = ({ currentUser, handleLogout }) => (
  <MainHeaderWrapper>
    <Logo>Blogslist App</Logo>
    <MainHeaderNav>
      <Link to="/blogs">Blogs</Link>
      <Link to="/users">Users</Link>
    </MainHeaderNav>
    <div>{currentUser.name} logged in</div>
    <Button onClick={handleLogout}>Log out</Button>
  </MainHeaderWrapper>
)

MainHeader.propTypes = {
  currentUser: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default MainHeader
