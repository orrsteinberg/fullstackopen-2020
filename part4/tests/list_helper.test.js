const listHelper = require('../utils/list_helper.js')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

describe('Total likes', () => {
  test('of bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })

  test('of empty list is 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('of a list with one item, is the number of likes for that item', () => {
    expect(listHelper.totalLikes([blogs[0]])).toBe(7)
  })
})

describe('Favorite blog', () => {
  test('of a large list returns the correct blog', () => {
    const correctAnswer = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    expect(listHelper.favoriteBlog(blogs)).toEqual(correctAnswer)
  })

  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toEqual(null)
  })

  test('of list with one item, is that item', () => {
    const correctAnswer = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    }
    expect(listHelper.favoriteBlog([blogs[0]])).toEqual(correctAnswer)
  })
})

describe('Most blogs', () => {
  test('of bigger list is calculated right', () => {
    const correctAnswer = {
      author: 'Robert C. Martin',
      blogs: 3,
    }
    expect(listHelper.mostBlogs(blogs)).toEqual(correctAnswer)
  })

  test('of empty list is null', () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })

  test('of a list with one item is that item', () => {
    const correctAnswer = {
      author: blogs[0].author,
      blogs: 1,
    }
    expect(listHelper.mostBlogs([blogs[0]])).toEqual(correctAnswer)
  })
})

describe('Most likes', () => {
  test('of bigger list is calculated right', () => {
    const correctAnswer = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }
    expect(listHelper.mostLikes(blogs)).toEqual(correctAnswer)
  })

  test('of empty list is null', () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })

  test('of a list with one item is that item', () => {
    const correctAnswer = {
      author: blogs[0].author,
      likes: blogs[0].likes,
    }
    expect(listHelper.mostLikes([blogs[0]])).toEqual(correctAnswer)
  })
})
