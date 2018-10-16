const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
});

blogsRouter.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (blog) { 
      res.json(blog)
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

blogsRouter.post("/", async (req, res) => {
  try {

    const body = req.body
  
    if (body.title == undefined || body.url == undefined) {
      return res.status(400).json({error: 'title or url missing'})
    }
    const blog = new Blog({
      title: body.title, 
      author: body.author === undefined? 'No author' : body.author, 
      url: body.url, 
      likes: body.likes === undefined ? 0 : body.likes
    })
    const savedBlog = await blog.save()
    res.json(savedBlog)
  } catch (exception) {
    console.log(exception)
    res.status(500).json({error: 'something went wrong...'})
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
        res.json(updatedBlog)
      })
      .catch(err => {
        console.log(err)
        res.status(400).send({error: 'malformatted id'})
      })
})

module.exports = blogsRouter;
