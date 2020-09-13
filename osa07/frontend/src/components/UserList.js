import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
	if (users === null) return null
	return (
		<div>
			<h2>users</h2>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>user</th>
						<th>blogs added</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}> {user.name}</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

export default UserList
