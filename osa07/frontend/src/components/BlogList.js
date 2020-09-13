import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => (
	<div>
		<h2>blogs</h2>
		<Table striped>
			<tbody>
				{blogs.sort((one, two) => two.likes - one.likes).map(blog => (
					<tr key={blog.id}>
						<td>
							<Link to={`/blogs/${blog.id}`}>
								{blog.title} by {blog.author}
							</Link>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	</div>
)

export default BlogList
