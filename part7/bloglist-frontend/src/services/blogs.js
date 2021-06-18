import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const createAuthConfig = (token) => ({
  headers: {
    Authorization: token,
  },
})

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const clearToken = () => (token = null)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blogObject) => {
  const response = await axios.post(baseUrl, blogObject, createAuthConfig(token))
  return response.data
}

const update = async (blogObject) => {
  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    blogObject,
    createAuthConfig(token)
  )
  return response.data
}

const comment = async (blogObject) => {
  const response = await axios.post(
    `${baseUrl}/${blogObject.id}/comments`,
    blogObject,
    createAuthConfig(token)
  )
  return response.data
}

const remove = async (blogId) => {
  return await axios.delete(`${baseUrl}/${blogId}`, createAuthConfig(token))
}

export default { getAll, create, update, remove, comment, setToken, clearToken }
