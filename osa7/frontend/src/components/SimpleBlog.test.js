import React from 'react'
import {shallow} from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<Blog />', () => {
    let blogComponent
    let blog
    let mockHandler

    beforeEach(() => {
        blog = {
            title: "Blog title",
            author: "blog Author",
            url: "https://blog-title.fi", 
            user: "5bc609ba5feb1e161c67d012",
            likes: 5
        }
        mockHandler = jest.fn()
        blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />) 
    })

    it ('renders title', () => {
        const contentDiv = blogComponent.find('.content')
        expect(contentDiv.text()).toContain(blog.title)
    })

    it ('renders author', () => {
        const contentDiv = blogComponent.find('.content')
        expect(contentDiv.text()).toContain(blog.author)
    })

    it ('renders likes', () => {
        const contentDiv = blogComponent.find('.likes')
        expect(contentDiv.text()).toContain(blog.likes)
    })

    it('clicking like button twice calls event handler twice',  () => {

        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})