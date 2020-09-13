import React from "react";
import { shallow } from "enzyme";
import Blog from "./Blog";

describe.only("<Blog />", () => {
  let blogComponent;
  let blog;
  let mockHandler;

  beforeEach(() => {
    blog = {
      title: "Blog title",
      author: "Blog author",
      likes: 1,
      url: "https://blog-title.fi",
      user: "5bc609ba5feb1e161c67d012"
    };
    mockHandler = jest.fn();
    blogComponent = shallow(<Blog blog={blog} like={mockHandler} />);
  });

  it("at start the children are not displayed", () => {
    const div = blogComponent.find(".detailed");
    expect(div.getElement().props.style).toEqual({
      display: "none",
      paddingTop: 10,
      paddingLeft: 2,
      border: "solid",
      borderWidth: 1,
      marginBottom: 5
    });
  });

  it("renders title", () => {
    const contentDiv = blogComponent.find(".content");
    expect(contentDiv.text()).toContain(blog.title);
    expect(contentDiv.text()).toContain(blog.author);
  });

  it("clicking like button calls event handler once", () => {
    const button = blogComponent.find("button");
    button.simulate("click");

    expect(mockHandler.mock.calls.length).toBe(1);
  });

  it("clicking title reveals more info", () => {
      const button = blogComponent.find('.compactP')
      button.at(0).simulate('click')
      const div = blogComponent.find('.detailed')
      expect(div.getElement().props.style).toEqual({
        display: "",
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
      })
      expect(div.text()).toContain(blog.likes)
  });
});
