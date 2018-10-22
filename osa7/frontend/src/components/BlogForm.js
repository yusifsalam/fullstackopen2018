import React from "react";
import { Button, FormControl, FormGroup } from 'react-bootstrap'

const BlogForm = ({ onSubmit, handleChange, title, author, url, user }) => (
  <div>
    <h2>create new blog</h2>
    <form onSubmit={onSubmit}>
      <FormGroup>
        <FormControl 
        type='text'
        name='newBlogTitle'
        value={title}
        placeholder='Blog title'
        onChange={handleChange}
        />
        <FormControl 
        type='text'
        name='newBlogAuthor'
        value={author}
        placeholder='Author name'
        onChange={handleChange}
        />
        <FormControl 
        type='text'
        value={url}
        name='newBlogURL'
        placeholder='Blog URL'
        onChange={handleChange}
        />
      </FormGroup>
      <Button block type="submit">create</Button>
    </form>
  </div>
)

export default BlogForm