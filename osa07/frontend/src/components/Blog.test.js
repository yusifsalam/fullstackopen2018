import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
	let blogComponent
	let blog
	let mockHandler
	let mockHandler_2
	let mockHandler_3
	let mockHandler_4
	let user

	beforeEach(() => {
		(blog = {
			title: 'Blog title',
			author: 'Blog author',
			likes: 5,
			url: 'https://blog-title.fi',
			user: '5bc609ba5feb1e161c67d012',
			comments: ['hi']
		}),
		(user = {
			name: 'name',
			username: 'username',
			token: '123'
		})
		mockHandler = jest.fn()
		mockHandler_2 = jest.fn()
		mockHandler_3 = jest.fn()
		mockHandler_4 = jest.fn()

		blogComponent = shallow(
			<Blog
				blog={blog}
				comment="hi"
				user={user}
				handleLike={mockHandler}
				handleDelete={mockHandler_2}
				handleComment={mockHandler_3}
				handleChange={mockHandler_4}
			/>
		)
	})


	it('renders title and author', () => {
		const contentDiv = blogComponent.find('.content')
		expect(contentDiv.text()).toContain(blog.title)
		expect(contentDiv.text()).toContain(blog.author)
	})

	it('renders comments', () => {
		const contentDiv = blogComponent.find('.comments')
		expect(contentDiv.text()).toContain('<ListGroupItem />')
	})

	it('renders number of likes', () => {
		const contentDiv = blogComponent.find('.likeCount')
		expect(contentDiv.text()).toContain(5)
	})

	it('clicking like button calls event handler once', () => {
		const button = blogComponent.find('.likeBtn')
		button.simulate('click')

		expect(mockHandler.mock.calls.length).toBe(1)
	})

	// it('clicking title reveals more info', () => {
	// 	const button = blogComponent.find('.compactP')
	// 	button.at(0).simulate('click')
	// 	const div = blogComponent.find('.detailed')
	// 	expect(div.getElement().props.style).toEqual({
	// 		display: '',
	// 		paddingTop: 10,
	// 		paddingLeft: 2,
	// 		border: 'solid',
	// 		borderWidth: 1,
	// 		marginBottom: 5
	// 	})
	// 	expect(div.text()).toContain(blog.likes)
	// })
})
