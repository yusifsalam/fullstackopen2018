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
      <div>
        <div style={showWhenVisible}>
          <p onClick={this.toggleVisibility}>
            {this.props.blog.title} {this.props.blog.author}{" "}
          </p>
        </div>
        <div style={hideWhenVisible}>
          <p onClick={this.toggleVisibility}>{this.props.blog.title}: {this.props.blog.author} </p>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <p>{this.props.blog.likes} likes <button onClick={this.props.like}>like</button></p>
          <p>added by {this.props.blog.user.name}</p>
          {this.props.showButton === true ? <button onClick={this.props.handleDelete}>delete</button> : <p></p>}
        </div>
      </div>
    );
  }
}

export default Blog;
