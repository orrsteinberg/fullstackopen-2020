const listHelper = require('../utils/list_helper.js')
const blogs = listHelper.blogs

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
