const supertest = require('supertest')
const { app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb } = require('./test_helper')


describe('testing blog api', () => {

    beforeAll(async () => {
        await Blog.remove({})
        await User.remove({})
        const blogObjects = initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
        let user = new User(initialUsers[0])
        await user.save()
    })

    test('blogs are returned as json by GET /api/blogs', async () => {
        const blogsInDatabase = await blogsInDb()
        const res = await api
                            .get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
        // console.log(res.body)
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

    describe.skip('addition of a new blog', async () => {

        test('POST /api/blogs succeeds with valid data', async () => {
          const blogsAtStart = await blogsInDb()
          const users = await usersInDb()
          console.log('users',users)
          const newBlog = {
            title : 'New blog title',
            url: 'New blog url',
            user: '5bc5d7e2e21026957707bbdc'
          }
    
          await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
          const blogsAfterOperation = await blogsInDb()
    
          expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
    
          const titles = blogsAfterOperation.map(b => b.title)
          expect(titles).toContain('New blog title')
        })
    
        test('POST /api/blogs fails with proper statuscode if content is missing', async () => {
          const newBlog = {
          }
    
          const blogsAtStart = await blogsInDb()
    
          await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    
          const blogsAfterOperation = await blogsInDb()
    
          expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
        })
    })

    describe.skip('deletion of a blog', async () => {
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

    describe('when there is initially one user at db', async () => {
        beforeAll(async () => {
          await User.remove({})
          const user = new User({ username: 'root', password: 'sekret' })
          await user.save()
        })
      
        test('POST /api/users succeeds with a fresh username', async () => {
          const usersBeforeOperation = await usersInDb()
      
          const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
          }
      
          await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
      
          const usersAfterOperation = await usersInDb()
          expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
          const usernames = usersAfterOperation.map(u=>u.username)
          expect(usernames).toContain(newUser.username)
        })
      
        test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
          const usersBeforeOperation = await usersInDb()
        
          const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen'
          }
        
          const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
          expect(result.body).toEqual({ error: 'username must be unique'})
        
          const usersAfterOperation = await usersInDb()
          expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
        })
    })

    afterAll(() => {
        server.close()
    })
})
