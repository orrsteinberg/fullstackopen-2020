import React from 'react'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import { Button, Input } from '../globalStyles'

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
    <>
      <h2>Create new</h2>
      <form id="create-blog-form" onSubmit={handleSbmit}>
        <div>
          Title: <Input {...title} />
        </div>
        <div>
          Author: <Input {...author} />
        </div>
        <div>
          URL: <Input {...url} />
        </div>
        <Button primary type="submit">
          Create
        </Button>
      </form>
    </>
  )
}

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default CreateBlogForm
