import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { Button, Input } from '../globalStyles'

const CreateBlogForm = ({ createBlog }) => {
  const [titleField, clearTitleField] = useField('text')
  const [authorField, clearAuthorField] = useField('text')
  const [urlField, clearUrlField] = useField('text')

  const clearAllFields = useCallback(() => {
    clearTitleField()
    clearAuthorField()
    clearUrlField()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title: titleField.value,
      author: authorField.value,
      url: urlField.value,
    })
    clearAllFields()
  }

  return (
    <>
      <h2>Create new</h2>
      <form id="create-blog-form" onSubmit={handleSubmit}>
        <div>
          Title: <Input {...titleField} />
        </div>
        <div>
          Author: <Input {...authorField} />
        </div>
        <div>
          URL: <Input {...urlField} />
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
