import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> component', () => {
  let component
  const mockHandlerUpdate = jest.fn()
  const mockHandlerDelete = jest.fn()

  beforeEach(() => {
    const user = {
      name: 'Test User',
      username: 'testUsername'
    }

    const blog = {
      title: 'Blog Title',
      author: 'author',
      url: 'url',
      likes: 10,
      user: {
        username: 'testUsername'
      }
    }

    component = render(
      <Blog
        blog={blog}
        user={user}
        updateBlog={mockHandlerUpdate}
        deleteBlog={mockHandlerDelete}
      />
    )
  })

  test('renders without errors', () => {
    expect(component).toBeDefined()
  })

  test('shows the blog title and author, but not the other details', () => {
    const blogDetails = component.container.querySelector('.blogDetails')
    expect(blogDetails).toBe(null)
  })

  test('shows the blog details when the button is pressed', () => {
    let button = component.getByText('view')
    fireEvent.click(button)

    button = component.getByText('hide')
    expect(button).toBeDefined()

    const details = component.container.querySelector('.blogDetails')
    expect(details).toBeDefined()
  })

  test('calls the update handler when clicking like twice', () => {
    let viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    let likeButton = component.getByText('Add')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandlerUpdate.mock.calls).toHaveLength(2)

  })

})
