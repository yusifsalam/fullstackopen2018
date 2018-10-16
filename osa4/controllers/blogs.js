const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})

  res.json(blogs.map(Blog.format))
});

blogsRouter.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (blog) { 
      res.json(Blog.format(blog))
    } else {
      res.status(404).end()
    }
  } catch (exception) {
      console.log(exception)
      res.status(400).send({error: 'malformatted id'})
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (exception) {
      console.log(exception)
      res.status(400).send({error: 'malformatted id'})
  }
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  try {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id){
      return res.status(401).json({error: 'token missing or invalid'})
    }
    if (body.title == undefined || body.url == undefined) {
      return res.status(400).json({error: 'title or url missing'})
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title, 
      author: body.author === undefined? 'No author' : body.author, 
      url: body.url, 
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.json(Blog.format(blog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      res.status(401).json({error:exception.message})
    } else{
      console.log(exception)
      res.status(500).json({error: 'something went wrong...'})
    }
  }
})

blogsRouter.put('/:id', (req, res) => {
  const body = req.body

  const blog = {
    title: body.title, 
    url: body.url, 
    author: body.author, 
    likes: body.likes
  }

  Blog.
      findByIdAndUpdate(req.params.id, blog, {new: true})
      .then(updatedBlog => {
        res.json(Blog.format(updatedBlog))
      })
      .catch(err => {
        console.log(err)
        res.status(400).send({error: 'malformatted id'})
      })
})

module.exports = blogsRouter;
