const supertest = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const Blog = require('../models/blog')

// Global token variables
let token
let noBlogsToken

// Test suite
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const rootUser = await new User({
    username: 'root',
    passowrd: 'secret',
  }).save()

  const userWithNoBlogs = await new User({
    username: 'notRoot',
    passowrd: 'aLittleLessSecret',
  }).save()

  const userForToken = { username: rootUser.username, id: rootUser.id }
  token = jwt.sign(userForToken, process.env.SECRET)

  const userWithNoBlogsToken = {
    username: userWithNoBlogs.username,
    id: userWithNoBlogs.id,
  }
  noBlogsToken = jwt.sign(userWithNoBlogsToken, process.env.SECRET)

  await Promise.all(
    helper.initialBlogs.map((blog) => {
      blog.user = rootUser.id
      return new Blog(blog).save()
    })
  )
})

describe('Blogs', () => {
  test('are returned in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('are all returned when using the /api/blogs route', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('can be viewed individually', async () => {
    const allBlogsinDb = await helper.blogsInDb()
    const blogToView = allBlogsinDb[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body.id).toBe(blogToView.id)
  })

  test('return 404 status code when the blog does not exist', async () => {
    await api.get('/api/blogs/someMadeUpId123').expect(404)
  })

  test('can have more likes added', async () => {
    const allBlogsinDb = await helper.blogsInDb()
    const blogToBeUpdated = allBlogsinDb[0]

    const updatedData = {
      likes: 100,
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send(updatedData)
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    expect(updatedBlog.body.likes).toBe(updatedData.likes)
  })

  test('cannot be deleted if the blog was not created by the same user', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${noBlogsToken}`)
      .expect(400)
  })

  test('can be deleted if the blog was created by the same user', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const blogsIds = blogsAtEnd.map((b) => b.id)
    expect(blogsIds).not.toContain(blogToDelete.id)
  })

  test('cannot be added without a valid user token', async () => {
    const newBlog = {
      title: 'Just an example blog title',
      author: 'John Doe',
      url: 'http://www.example.com',
      likes: 12,
    }

    await api.post('/api/blogs').send(newBlog).expect(401)
  })

  test('can be added with a valid user token', async () => {
    const newBlog = {
      title: 'Just an example blog title',
      author: 'John Doe',
      url: 'http://www.example.com',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('cannot be added with invalid data', async () => {
    const newBlog = {
      title: 'Invalid blog post',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('are assigned 0 likes if not specified otherwise', async () => {
    const newBlog = {
      title: 'Example blog title',
      author: 'John Doe',
      url: 'http://www.example.com',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(response.body.likes).toBe(0)
  })
})

afterAll(() => mongoose.connection.close())
