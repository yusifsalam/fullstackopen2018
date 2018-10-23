const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require('../models/user')
const jwt = require('jsonwebtoken')


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
  const blog = await Blog.findById(req.params.id)
  try {
    const token = req.token
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!token || !decodedToken.id){
      return res.status(401).json({error: 'token missing or invalid'})
    }

    if (decodedToken.id.toString() !== blog.user.toString()) {
      return res.status(400).json({ error: 'only creator can delete a blog' })
    }

    if (blog.user.toString() === decodedToken.id.toString()){
      await blog.remove()
      res.status(204).end()
    } 
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      res.status(401).json({error:exception.message})
    } else {
      console.log(exception)
      res.status(400).json({error: 'malformatted id'})
    }
    }
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (title === undefined ||  url === undefined) {
      return response.status(400).json({ error: 'url or title missing'})
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({ title, author, url, likes: (likes || 0), user: user, comments:[]} )
    

    const result = await blog.save()
    
    user.blogs = user.blogs.concat(Blog.format(blog).id)
    await user.save()

    response.status(201).json(Blog.format(result))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title, 
    url: body.url, 
    author: body.author, 
    likes: body.likes,
    comments: body.comments,
    user: body.user
  }

  await Blog.
      findByIdAndUpdate(req.params.id, blog, {new: true})
      .then(updatedBlog => {
        res.json(Blog.format(updatedBlog))
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({error: 'malformatted id'})
      })
})

module.exports = blogsRouter;
