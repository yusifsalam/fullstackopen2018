const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
});

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
});

module.exports = blogsRouter;
