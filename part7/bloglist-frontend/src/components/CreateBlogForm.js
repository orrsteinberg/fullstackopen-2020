import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'

const CreateBlogForm = () => {
  const [title, clearTitle] = useField('text')
  const [author, clearAuthor] = useField('text')
  const [url, clearUrl] = useField('text')
  const dispatch = useDispatch()

  const handleCreateBlog = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      })
    )

    clearTitle()
    clearAuthor()
    clearUrl()
  }

  return (
    <div>
      <h2>Create new</h2>
      <form id="create-blog-form" onSubmit={handleCreateBlog}>
        <div>
          Title: <input {...title} />
        </div>
        <div>
          Author: <input {...author} />
        </div>
        <div>
          URL: <input {...url} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm
