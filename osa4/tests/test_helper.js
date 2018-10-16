const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'How to code', 
        author: 'Dr. Yamak', 
        likes: 10
    },
    {
        title: 'How not to code', 
        author: 'Dr. Yamak', 
        likes: 2
    },
    {
        title: 'Dress like a fine man', 
        author: 'Silvio Dattore', 
        likes: 27
    },
    {
        title: 'Gone with the wind', 
        author: 'Miyazagi', 
        likes: 99
    },
    {
        title: 'So you wanna be a powerlifter', 
        author: 'Bryce K.', 
        likes: 42
    }
]

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs  
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}