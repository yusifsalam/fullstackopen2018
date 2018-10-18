import React from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from './components/LoginForm'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      error: null,
      username: "",
      password: "",
      newBlogTitle: "",
      newBlogAuthor: "",
      newBlogURL: "",
      newBlogLikes: 0,
      user: null
    };
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs }));
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      console.log("found the user token");
      const user = JSON.parse(loggedUserJSON);
      this.setState({ user });
      blogService.setToken(user.token);
    }
  }

  login = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      console.log("logging in with", this.state.username, this.state.password);
      this.setState({ username: "", password: "", user });
    } catch (exception) {
      this.setState({
        error: "username or password incorrect"
      });
      setTimeout(() => {
        this.setState({ error: null });
      }, 5000);
    }
  };

  logout = event => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedBlogAppUser");
      console.log("logged out");
      this.setState({
        erorr: "logged out",
        user: null
      });
      setTimeout(() => {
        this.setState({ erorr: null });
      }, 3000);
    } catch (exception) {
      console.log(exception);
    }
  };

  addBlog = event => {
    event.preventDefault();
    try {
      console.log(this.state.user.token);
      const blogObject = {
        title: this.state.newBlogTitle,
        author: this.state.newBlogAuthor,
        url: this.state.newBlogURL,
        user: this.state.user
      };
      console.log(blogObject)
      blogService.create(blogObject).then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlogAuthor: "",
          newBlogTitle: "",
          newBlogURL: "",
          newBlogLikes: 0,
          error: `a new blog ${blogObject.title} by ${blogObject.author} added`
        });
        setTimeout(() => {
          this.setState({ error: null });
        }, 3000);
      });
    } catch (exception) {
      console.log(exception);
    }
  };

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleBlogFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLike = id => {
    return () => {
      const blog = this.state.blogs.find(b => b.id === id);
      const changedBlog = { ...blog, likes: blog.likes + 1 };
      console.log('changed blog', changedBlog);
      blogService
        .update(id, changedBlog)
        .then(changedBlog => {
          this.setState({
            blogs: this.state.blogs.map(
              blog => (blog.id !== id ? blog : changedBlog)
            )
          });
        })
        .catch(error => {
          this.setState({
            error: `blog ${blog.title} has already been removed`,
            blogs: this.state.blogs.filter(b => b.id !== id)
          });
          setTimeout(() => {
            this.setState({ error: null });
          }, 5000);
        });
    };
  };

  handleDelete = id => {
    return () => {
      const blog = this.state.blogs.find(b => b.id === id);
      if (window.confirm(`do you really want to delete ${blog.title} ?`)) {
        blogService
          .deleteBlog(id)
          .then(b => {
            this.setState({
              blogs: this.state.blogs.filter(blogi => blogi.id !== id),
              error: `removed ${blog.title} by ${blog.author}`
            });
            setTimeout(() => {
              this.setState({
                error: null
              });
            }, 5000);
          })
          .catch(error => {
            this.setState({
              error: "Cannot remove this blog"
            });
            setTimeout(() => {
              this.setState({
                error: null
              });
            }, 5000);
          });
      }
    };
  };

  

  render() {
    // console.log(this.state.blogs)
    const loginForm = () => (
      <Togglable buttonLabel="login">
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
      </Togglable>
    );

    const blogForm = () => (
      <div>
        <h2>create new blog</h2>
        <form onSubmit={this.addBlog}>
          <div>
            title
            <input
              value={this.state.newBlogTitle}
              name="newBlogTitle"
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <div>
            author
            <input
              value={this.state.newBlogAuthor}
              name="newBlogAuthor"
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <div>
            url
            <input
              value={this.state.newBlogURL}
              name="newBlogURL"
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
        <h2>blogs</h2>
        {this.state.blogs
          .sort((one, two) => two.likes - one.likes)
          .map(blog => {
            // console.log(blog)
            return(
            <Blog className='Blog'
              key={blog.id}
              blog={blog}
              like={this.handleLike(blog.id)}
              handleDelete={this.handleDelete(blog.id)}
              showButton={
                this.state.user === null ? false
                  : blog.user.username === undefined ? 
                  this.state.user.username.toString() === blog.user.toString() ?
                    true : false : this.state.user.username.toString() === blog.user.username.toString() ? true
                    : false
              }
            />
          )})}
      </div>
    );

    return (
      <div>
        <h1> Blogilistat</h1>
        <Notification message={this.state.error} />
        {this.state.user === null ?
          loginForm(): 
          <div>
            <p>
              {this.state.user.name} logged in
              <button onClick={this.logout}> logout</button>
            </p>

            {blogForm()}
          </div>
        }
      </div>
    );
  }
}

export default App;
