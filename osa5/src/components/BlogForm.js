import React from "react";
import Blog from './Blog'

const BlogForm = ({ onSubmit, handleChange, blog, user }) => (
  <div>
    <h2>create new blog</h2>
    <form onSubmit={onSubmit}>
      <div>
        title
        <input
          value={blog.title}
          name="newBlogTitle"
          onChange={handleChange}
        />
      </div>
      <div>
        author
        <input
          value={blog.author}
          name="newBlogAuthor"
          onChange={handleChange}
        />
      </div>
      <div>
        url
        <input
          value={blog.url}
          name="newBlogURL"
          onChange={handleChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

export default BlogForm