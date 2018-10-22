import React from "react";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
  };
  render() {
    const hideWhenVisible = {
      display: this.state.visible ? "none" : "",
      paddingTop: 10,
      paddingLeft: 2,
      border: "solid",
      borderWidth: 1,
      marginBottom: 5
    };
    const showWhenVisible = { display: this.state.visible ? "" : "none" };

    return (
      <div className='wrapper'> 
        <div className='content'>
          <div className='compact'style={showWhenVisible}>
            <h2 className='compactP'onClick={this.toggleVisibility}>
              {this.props.blog.title} {this.props.blog.author}{" "}
            </h2>
            <a href={this.props.blog.url}>{this.props.blog.url}</a>
            <p>{this.props.blog.likes} likes <button>like</button></p>
            <p>added by {this.props.blog.user.name}</p>
          </div>
          <div className='detailed' style={hideWhenVisible}>
            <p onClick={this.toggleVisibility}>
              {this.props.blog.title}: {this.props.blog.author}{" "}
            </p>
            <a href={this.props.blog.url}>{this.props.blog.url}</a>
            <p>
              {this.props.blog.likes} likes{" "}
              <button onClick={this.props.like}>like</button>
            </p>
            <p>added by {this.props.blog.user.name}</p>
            {this.props.showButton === true ? (
              <button onClick={this.props.handleDelete}>delete</button>
            ) : (
              <p />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
