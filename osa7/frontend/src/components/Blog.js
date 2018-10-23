import React from 'react'
import {
	Button,
	ListGroup,
	ListGroupItem,
	FormGroup,
	FormControl
} from 'react-bootstrap'

class Blog extends React.Component {
	render() {
		const {
			blog,
			handleChange,
			comment,
			handleComment,
			handleDelete,
			handleLike,
			user
		} = this.props
		if (blog === undefined) return null
		if (user === undefined) return null
		const deletable = blog.user.username === user.username
		return (
			<div>
				<h2>
					{blog.title} by {blog.author}
				</h2>
				<a href={blog.url}>{blog.url}</a>
				<p>
					{blog.likes} likes{' '}
					<Button onClick={handleLike} bsStyle="success">
						like
					</Button>
				</p>
				<p>added by {blog.user ? blog.user.name : 'anonymous'}</p>
				{deletable && (
					<Button onClick={handleDelete} bsStyle="danger">
						delete
					</Button>
				)}
				<h3>comments</h3>
				<ListGroup>
					{blog.comments.map(comment => (
						<ListGroupItem key={comment}>{comment}</ListGroupItem>
					))}
				</ListGroup>

				<form onSubmit={handleComment}>
					<FormGroup>
						<FormControl
							type="text"
							name="comment"
							id={blog.id}
							value={comment}
							placeholder="Add new comment"
							onChange={handleChange}
						/>
					</FormGroup>
					<Button type="submit">submit</Button>
				</form>
			</div>
		)
	}
}

export default Blog
