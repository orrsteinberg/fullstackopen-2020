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
      username: 'testUsername',
    }

    const blog = {
      title: 'Blog Title',
      author: 'author',
      url: 'url',
      likes: 10,
      user: {
        username: 'testUsername',
      },
    }

    component = render(
      <Blog blog={blog} user={user} updateBlog={mockHandlerUpdate} deleteBlog={mockHandlerDelete} />
    )
  })

  test('renders without errors', () => {
    expect(component).toBeDefined()
  })

  test('shows the blog title and author, but not the other details', () => {
    const title = component.container.querySelector('.blog-title')
    const author = component.container.querySelector('.blog-author')
    expect(title).toBeDefined()
    expect(author).toBeDefined()

    const details = component.container.querySelector('.blog-details')
    expect(details).toBe(null)
  })

  test('shows the blog details when the show button is clicked', () => {
    let button = component.getByText('view')
    fireEvent.click(button)

    button = component.getByText('hide')
    expect(button).toBeDefined()

    const details = component.container.querySelector('.blog-details')
    expect(details).toBeDefined()
  })

  test('hides the blog details when the hide button is clicked', () => {
    let button = component.getByText('view')
    fireEvent.click(button)

    button = component.getByText('hide')
    expect(button).toBeDefined()
    fireEvent.click(button)

    const blogDetails = component.container.querySelector('.blog-details')
    expect(blogDetails).toBe(null)
  })

  test('calls the update handler twice when clicking "like" twice', () => {
    let viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    let likeButton = component.getByText('Add')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandlerUpdate.mock.calls).toHaveLength(2)
  })
})
