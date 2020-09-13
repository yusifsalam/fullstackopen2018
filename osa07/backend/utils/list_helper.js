const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  return blogs.reduce( (sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (Object.getOwnPropertyNames(blogs).length !== 0) {
    return blogs.map(blog => {
      return {
        "title" : blog.title,
        "author" : blog.author,
        "likes" : blog.likes
      }
    }).reduce((fav, blogs) => {
      if (Object.getOwnPropertyNames(fav).length !== 0){
        if (blogs.likes > fav.likes) {
          return blogs
        }
        else {
          return fav
        }
      }
      else{
        return blogs
      }
    }, {})
  }
  else {
    return {}
  }
  
}

const mostBlogs = (blogs) => {
  if (Object.getOwnPropertyNames(blogs).length !== 0){

    const counts = {}
    const authors = blogs.map(blog => {
      return {
        "author": blog.author, 
        "title" : blog.title
      }
    }).reduce((current, previous) => {
      counts[previous.author] =  1 + (counts[previous.author] || 0)
    }, {})
    sorted = Object.keys(counts).sort( (a,b) => counts[a] - counts[b])
    // console.log(sorted[sorted.length-1])
    return {
      "author" : sorted[sorted.length-1],
      "blogs" : counts[sorted[sorted.length-1]]
    }
  }
  else{
    return {}
  }
}

const mostLikes = (blogs) => {
  if (Object.getOwnPropertyNames(blogs).length !== 0){

    const counts = {}
    const authors = blogs.map(blog => {
      return {
        "author": blog.author, 
        "title" : blog.title,
        "likes" : blog.likes
      }
    }).reduce((current, previous) => {
      counts[previous.author] =  previous.likes + (counts[previous.author] || 0)
    }, {})
    sorted = Object.keys(counts).sort( (a,b) => counts[a] - counts[b])
    // console.log(sorted[sorted.length-1])
    return {
      "author" : sorted[sorted.length-1],
      "likes" : counts[sorted[sorted.length-1]]
    }
  }
  else {
    return {}
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs, 
  mostLikes
};
