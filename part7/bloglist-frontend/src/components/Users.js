import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from './Header'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <Header title="Users" />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
