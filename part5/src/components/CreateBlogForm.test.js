import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogForm from './CreateBlogForm'

test('<CreateBlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <CreateBlogForm createNewBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('.createBlogForm')

  fireEvent.change(title, {
    target: { value: 'New Blog Title' }
  })
  fireEvent.change(author, {
    target: { value: 'New Blog Author' }
  })
  fireEvent.change(url, {
    target: { value: 'New Blog Url' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('New Blog Title' )
  expect(createBlog.mock.calls[0][0].author).toBe('New Blog Author' )
  expect(createBlog.mock.calls[0][0].url).toBe('New Blog Url' )
})
