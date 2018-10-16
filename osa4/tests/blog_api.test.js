const supertest = require('supertest')
const { app, server} = require('../index')
const api = supertest(app)
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

beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('testing blog api', () => {

    test('blogs are returned as json', async () => {
        await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })
    
    test('there are five blogs', async () => {
        const res = await api
                            .get('/api/blogs')
        expect(res.body.length).toBe(5)
    })
    
    test('the first blog is by Dr.Yamak', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body[0].author).toBe('Dr. Yamak')
    })
    
    // test('a specific blog can be viewed', async () => {
    //     const resultAll = await api
    //                                 .get('/api/blogs')
    //                                 .expect(200)
    //                                 .expect('Content-Type', /application\/json/)
    //     const aBlogFromAll = resultAll.body[0]

    //     const resultBlog = await api
    //                                 .get(`/api/blogs/${aBlogFromAll._id}`)
    //     const blogObject = resultBlog.body
    //     console.log(blogObject)
    //     expect(blogObject).toEqual(aBlogFromAll)
    // })

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'API test',
            author: 'Dr. Jussi', 
            likes: 1
        }
        await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        const res = await api.get('/api/blogs')
        const titles = res.body.map(r => r.title)
        expect(res.body.length).toBe(initialBlogs.length + 1)
        expect(titles).toContain('API test')
    })

    test('empty blog is not added', async () => {
        const newBlog = {}
        const initialBlogs = await api.get('/api/blogs')
        await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)

        const res = await api.get('/api/blogs')
        expect(res.body.length).toBe(initialBlogs.body.length)
    })

    test('likes are set to 0 when not given', async () => {
        const newBlog = {
            title: 'API test2',
            author: 'Dr. Jussi2', 
        }
        await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        const res = await api.get('/api/blogs')
        const likes = res.body.map(r => r.likes)
        expect(res.body.length).toBe(initialBlogs.length + 2)
        expect(likes[initialBlogs.length+1]).toBe(0)
    })
})

afterAll(() => {
    server.close()
})