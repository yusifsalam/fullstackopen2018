import React from "react";
import { Button, ListGroup, ListGroupItem, FormGroup, FormControl } from 'react-bootstrap'

class Blog extends React.Component {
  render() {
    const { blog, handleChange, comment, handleComment } = this.props;
    if (blog === undefined) return null
    return (
      <div>
        <h2>
          {blog.title} by {blog.author}
        </h2>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes} likes <Button>like</Button>
        </p>
        <p>added by {blog.user.name}</p>
        <Button>delete</Button>
        <h3>comments</h3>
        <ListGroup>
        {blog.comments.map(comment=>
          <ListGroupItem key={comment}>{comment}</ListGroupItem>)}
        </ListGroup>

        <form onSubmit={handleComment}>
        <FormGroup>
          <FormControl
            type='text'
            name='comment'
            id={blog.id}
            value={comment}
            placeholder='Add new comment'
            onChange={handleChange}
            />
        </FormGroup>
          <Button type='submit'>submit</Button>
        </form>
        </div>
    );
  }
}

export default Blog;
