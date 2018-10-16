const supertest = require('supertest')
const { app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const {initialBlogs, nonExistingId, blogsInDb} = require('./test_helper')


describe('testing blog api', () => {

    beforeAll(async () => {
        await Blog.remove({})
    
        const blogObjects = initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('blogs are returned as json by GET /api/blogs', async () => {
        const blogsInDatabase = await blogsInDb()
        const res = await api
                            .get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
        expect(res.body.length).toBe(blogsInDatabase.length)
        const returnedTitles = res.body.map(b => b.title)
        blogsInDatabase.forEach( blog => {
            expect(returnedTitles).toContain(blog.title)
        })
    })
    
    test('a specific blog can be viewed by GET /api/blogs/:id', async () => {
        const blogsInDatabase = await blogsInDb()
        const aBlog = blogsInDatabase[0]

        const res = await api
                            .get(`/api/blogs/${aBlog._id}`)
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
        expect(res.body.title).toBe(aBlog.title)
    })

    test('404 returned by GET /api/blogs/:id without id given', async () => {
        const noId = await nonExistingId()
        const res = await api
            .get(`/api/blogs/${noId}`)
            .expect(404)
    })

    test('400 is returned by GET /api/blogs/:id with invalid id', async () => {
        const invalidId = '5bc5af42a3b38f3c4082ca'
        const res = await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })

    describe('addition of a new note', async () => {
        
        test('a valid blog can be added', async () => {
            const blogsAtStart = await blogsInDb()
            const newBlog = {
                title: 'API test',
                author: 'Dr. Jussi',
                url: 'google.com', 
                likes: 1
            }
            await api
                    .post('/api/blogs')
                    .send(newBlog)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
    
            const blogsAfterOperation = await blogsInDb()
            expect(blogsAfterOperation.length).toBe(blogsAtStart.length+1)
            
            const titles = blogsAfterOperation.map(b => b.title)
            expect(titles).toContain('API test')
        })

        test('empty blog is not added', async () => {
            const newBlog = {}
            const blogsAtStart = await blogsInDb()
            await api
                    .post('/api/blogs')
                    .send(newBlog)
                    .expect(400)
            const blogsAfterOperation = await blogsInDb()
            const titles = blogsAfterOperation.map(b => b.title)
            expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
        })
    })

    describe('deletion of a blog', async () => {
        let addedBlog

        beforeAll(async () => {
            addedBlog = new Blog({
                title : 'Blog DELETE',
                url: 'plz delete me', 
            })
            await addedBlog.save()
        })
        test ('DELETE /api/blogs/:id succeeds with proper status code', async () => {
            const blogsAtStart = await blogsInDb()
            await api  
                .delete(`/api/blogs/${addedBlog._id}`)
                .expect(204)
            const blogsAfterOperation = await blogsInDb()

            const titles = blogsAfterOperation.map(b => b.title)
            expect(titles).not.toContain(addedBlog.title)
            expect(blogsAfterOperation.length).toBe(blogsAtStart.length-1)
        })
    })

    afterAll(() => {
        server.close()
    })
})
