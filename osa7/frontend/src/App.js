import React from "react";
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import User from "./components/User";
import UserList from "./components/UserList";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import { Table } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

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
      user: null,
      users: []
    };
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs }));
    userService.getAll().then(users => this.setState({ users }));
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
      console.log(blogObject);
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
      console.log("changed blog", changedBlog);
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

  userById = id =>
    this.state.users.find(u => u.id === id);

  render() {
    return (
        <Router>
      <div>
        <h1> Blogilistat</h1>
        <Notification message={this.state.error} />
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
            <p>
              {this.state.user.name} logged in
              <button onClick={this.logout}> logout</button>
            </p>
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
                    path="/users"
                    render={() => <UserList users={this.state.users} />}
                  />
                  <Route
                    exact
                    path="/users/:id"
                    render={({ match }) => {
                      return <User user={this.userById(match.params.id)} />;
                    }}
                  />
                  <Route
                    exact
                    path="/blogs/:id"
                    render={({ match }) => {
                      return (
                        <Blog
                          blog={this.state.blogs.find(
                            b => b.id === match.params.id
                          )}
                        />
                      );
                    }}
                  />
                </div>
            </div>
          </div>
        )}
      </div>
        </Router>
    );
  }
}

export default App;
