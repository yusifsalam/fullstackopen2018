import React from 'react'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import User from './components/User'
import UserList from './components/UserList'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { Button, Label } from 'react-bootstrap'

import { HashRouter as Router, Route, NavLink } from 'react-router-dom'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			blogs: [],
			notification: null,
			username: '',
			password: '',
			newBlogTitle: '',
			newBlogAuthor: '',
			newBlogURL: '',
			newBlogLikes: 0,
			user: null,
			users: [],
			comment: ''
		}
	}

	componentDidMount() {
		blogService.getAll().then(blogs => this.setState({ blogs }))
		userService.getAll().then(users => this.setState({ users }))
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			console.log('found the user token')
			const user = JSON.parse(loggedUserJSON)
			this.setState({ user })
			blogService.setToken(user.token)
		}
	}

	login = async event => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username: this.state.username,
				password: this.state.password
			})

			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
			blogService.setToken(user.token)
			console.log('logging in with', this.state.username, this.state.password)
			this.setState({ username: '', password: '', user })
		} catch (exception) {
			this.setState({
				notification: 'username or password incorrect'
			})
			setTimeout(() => {
				this.setState({ notification: null })
			}, 5000)
		}
	}

	logout = event => {
		event.preventDefault()
		try {
			window.localStorage.removeItem('loggedBlogAppUser')
			console.log('logged out')
			this.setState({
				notification: 'logged out',
				user: null
			})
			setTimeout(() => {
				this.setState({ notification: null })
			}, 3000)
		} catch (exception) {
			console.log(exception)
		}
	}

	addBlog = event => {
		event.preventDefault()
		try {
			console.log(this.state.user.token)
			const blogObject = {
				title: this.state.newBlogTitle,
				author: this.state.newBlogAuthor,
				url: this.state.newBlogURL,
				user: this.state.user
			}
			console.log(blogObject)
			blogService.create(blogObject).then(newBlog => {
				this.setState({
					blogs: this.state.blogs.concat(newBlog),
					newBlogAuthor: '',
					newBlogTitle: '',
					newBlogURL: '',
					newBlogLikes: 0,
					notification: `a new blog ${blogObject.title} by ${
						blogObject.author
					} added`
				})
				setTimeout(() => {
					this.setState({ notification: null })
				}, 3000)
			})
		} catch (exception) {
			console.log(exception)
		}
	}

	handleLoginFieldChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleBlogFieldChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleComment = event => {
		event.preventDefault()
		try {
			const id = event.target.querySelector('input').id
			const blog = this.state.blogs.find(b => b.id === id)
			const changedBlog = {
				...blog,
				comments: blog.comments.concat(this.state.comment)
			}
			blogService
				.update(id, changedBlog)
				.then(changedBlog => {
					this.setState({
						blogs: this.state.blogs.map(
							blog => (blog.id !== id ? blog : changedBlog)
						),
						comment: '',
						notification: `comment ${this.state.comment} added to blog ${
							changedBlog.title
						}!`
					})
					setTimeout(() => {
						this.setState({
							notification: null
						})
					}, 5000)
				})
				.catch(err => {
					console.log(err)
					this.setState({
						notification: `blog ${blog.title} has already been removed`,
						blogs: this.state.blogs.filter(b => b.id !== id)
					})
					setTimeout(() => {
						this.setState({ notification: null })
					}, 5000)
				})
		} catch (exception) {
			console.log(exception)
		}
	}

	handleLike = id => async () => {
		const blog = this.state.blogs.find(b => b.id === id)
		const changedBlog = { ...blog, likes: blog.likes + 1 }
		await blogService
			.update(id, changedBlog)
			.then(changedBlog => {
				this.setState({
					blogs: this.state.blogs.map(
						blog => (blog.id !== id ? blog : changedBlog)
					),
					notification: `you liked ${blog.title} by ${blog.author}`
				})
				setTimeout(() => {
					this.setState({ notification: null })
				}, 5000)
			})
			.catch(err => {
				console.log(err)
				this.setState({
					notification: `blog ${blog.title} has already been removed`,
					blogs: this.state.blogs.filter(b => b.id !== id)
				})
				setTimeout(() => {
					this.setState({ notification: null })
				}, 5000)
			})
	}

	handleDelete = id => {
		return () => {
			const blog = this.state.blogs.find(b => b.id === id)
			if (window.confirm(`do you really want to delete ${blog.title} ?`)) {
				blogService
					.deleteBlog(id)
					.then(b => {
						this.setState({
							blogs: this.state.blogs.filter(blogi => blogi.id !== id),
							notification: `removed ${b.title} by ${b.author}`
						})
						setTimeout(() => {
							this.setState({
								notification: null
							})
						}, 5000)
					})
					.catch(err => {
						console.log(err)
						this.setState({
							notification: 'Cannot remove this blog'
						})
						setTimeout(() => {
							this.setState({
								notification: null
							})
						}, 5000)
					})
			}
		}
	}

	userById = id => this.state.users.find(u => u.id === id)

	render() {
		const Menu = () => {
			return (
				<div>
					<NavLink exact to="/">
						{' '}
						blogs{' '}
					</NavLink>
					<NavLink exact to="/users">
						{' '}
						users{' '}
					</NavLink>
				</div>
			)
		}

		return (
			<Router>
				<div>
					<h1> Blogilistat</h1>
					<Notification message={this.state.notification} />
					{this.state.user === null ? (
						<Togglable buttonLabel="login">
							<LoginForm
								visible={this.state.visible}
								username={this.state.username}
								password={this.state.password}
								handleChange={this.handleLoginFieldChange}
								handleSubmit={this.login}
							/>
						</Togglable>
					) : (
						<div>
							<Menu />
							<Label>
								{this.state.user.name} logged in
								<Button bsStyle="info" bsSize="small" onClick={this.logout}>
									{' '}
									logout
								</Button>
							</Label>
							<div>
								<Togglable buttonLabel="create blog">
									<BlogForm
										onSubmit={this.addBlog}
										handleChange={this.handleBlogFieldChange}
										title={this.newBlogTitle}
										author={this.newBlogAuthor}
										url={this.newBlogURL}
										user={this.state.user}
									/>
								</Togglable>
								<div>
									<Route
										exact
										path="/"
										render={() => <BlogList blogs={this.state.blogs} />}
									/>
									<Route
										exact
										path="/blogs"
										render={() => <BlogList blogs={this.state.blogs} />}
									/>
									<Route
										exact
										path="/users"
										render={() => <UserList users={this.state.users} />}
									/>
									<Route
										exact
										path="/users/:id"
										render={({ match }) => {
											return <User user={this.userById(match.params.id)} />
										}}
									/>
									<Route
										exact
										path="/blogs/:id"
										render={({ match }) => {
											const thisBlog = this.state.blogs.find(
												b => b.id === match.params.id
											)
											return (
												<Blog
													blog={thisBlog}
													handleChange={this.handleBlogFieldChange}
													comment={this.state.comment}
													handleComment={this.handleComment}
													user={this.state.user}
													handleDelete={this.handleDelete(match.params.id)}
													handleLike={this.handleLike(match.params.id)}
												/>
											)
										}}
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			</Router>
		)
	}
}

export default App
