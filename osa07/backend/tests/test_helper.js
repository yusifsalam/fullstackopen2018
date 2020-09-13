const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'How to code', 
        author: 'Dr. Yamak', 
        likes: 10,
        user: '5bc5d7e2e21026957707bbdc'
    },
    {
        title: 'How not to code', 
        author: 'Dr. Yamak', 
        likes: 2,
        user: '5bc5d7e2e21026957707bbdc'
    },
    {
        title: 'Dress like a fine man', 
        author: 'Silvio Dattore', 
        likes: 27,
        user: '5bc5d7e2e21026957707bbdc'
    },
    {
        title: 'Gone with the wind', 
        author: 'Miyazagi', 
        likes: 99,
        user: '5bc5d7e2e21026957707bbdc'
    },
    {
        title: 'So you wanna be a powerlifter', 
        author: 'Bryce K.', 
        likes: 42,
        user: '5bc5d7e2e21026957707bbdc'
    }
]

const initialUsers = [
    {
        _id: '5bc5d7e2e21026957707bbdc',
        name: "Name",
        username: 'username',
        token: '134'
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users
}

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
    initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}