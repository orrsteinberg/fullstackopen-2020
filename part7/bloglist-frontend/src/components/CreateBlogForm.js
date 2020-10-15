import React from 'react'
import { useField } from '../hooks'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ createBlog }) => {
  const [title] = useField('text')
  const [author] = useField('text')
  const [url] = useField('text')

  const handleSbmit = (event) => {
    event.preventDefault()
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    })
  }

  return (
    <div>
      <h2>Create new</h2>
      <form id="create-blog-form" onSubmit={handleSbmit}>
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

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default CreateBlogForm
