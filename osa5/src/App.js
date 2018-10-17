import React from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

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
    } catch (exception) {
      console.log(exception);
    }
  };

  addBlog = event => {
    event.preventDefault();
    try {
      console.log(this.state.user.token)
      const blogObject = {
        title: this.state.newBlogTitle,
        author: this.state.newBlogAuthor,
        url: this.state.newBlogURL,
        user: this.state.user._id
      }
      blogService
        .create(blogObject)
        .then(newBlog => {
          this.setState({
            blogs: this.state.blogs.concat(newBlog),
            newBlogAuthor: '',
            newBlogTitle:'',
            newBlogURL:'',
            newBlogLikes:0
          })
        })
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

  render() {
    const loginForm = () => (
      <div>
        <h1>Log in to application</h1>
        <form onSubmit={this.login}>
          <div>
            username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );

    const noteForm = () => (
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
      </div>
    );

    return (
      <div>
        {this.state.user === null ? (
          loginForm()
        ) : (
          <div>
            <p>
              {this.state.user.name} logged in
              <button onClick={this.logout}> logout</button>
            </p>

            {noteForm()}
          </div>
        )}
        <h2>blogs</h2>
        {this.state.blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
}

export default App;
