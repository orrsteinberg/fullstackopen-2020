const totalLikes = blogs => {
  return blogs.reduce((acc, blog) => acc += blog.likes, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) { return null }

  const mostLikes = (acc, blog) => {
    return acc.likes < blog.likes
      ? blog
      : acc
  }

  const favorite = blogs.reduce(mostLikes, blogs[0])
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = blogs => {
  if (blogs.length === 0) { return null }

  const authorsCount = {}

  blogs.forEach(blog => {
    const author = blog.author
    authorsCount[author]
      ? authorsCount[author] += 1
      : authorsCount[author] = 1
  })

  const authorWithMostBlogs = Object
    .keys(authorsCount)
    .sort((a, b) => authorsCount[b] - authorsCount[a])[0]

  return {
    author: authorWithMostBlogs,
    blogs: authorsCount[authorWithMostBlogs]
  }
}


const mostLikes = blogs => {
  if (blogs.length === 0) { return null }

  const authorsCount = {}

  blogs.forEach(blog => {
    const author = blog.author
    authorsCount[author]
      ? authorsCount[author] += blog.likes
      : authorsCount[author] = blog.likes
  })

  const authorWithMostLikes = Object
    .keys(authorsCount)
    .sort((a, b) => authorsCount[b] - authorsCount[a])[0]

  return {
    author: authorWithMostLikes,
    likes: authorsCount[authorWithMostLikes]
  }
}

module.exports = {
  totalLikes, favoriteBlog, mostBlogs, mostLikes
}
