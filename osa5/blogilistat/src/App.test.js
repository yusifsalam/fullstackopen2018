import React from "react";
import { mount } from "enzyme";
import App from "./App";
import Blog from "./components/Blog";
jest.mock("./services/blogs");
import blogService from "./services/blogs";

describe("<App />", () => {
  describe("when user is not logged in", () => {
    let app
    beforeEach(() => {
      app = mount(<App />);
    });

    it("no blogs are rendered", () => {
      app.update();
      const blogComponents = app.find(Blog);
      expect(blogComponents.length).toEqual(0);
    });
  });

  describe("when user is logged in", () => {
    let app
    beforeEach(() => {
      app = mount(<App />);
      const user = {
        username: "test",
        token:
          "123",
        name: "Tester"
      };
      localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

    it("all blogs are rendered", () => {
      app.update()
      const blogComponents = app.find(Blog);
      expect(blogComponents.length).toEqual(blogService.blogs.length);
    });
  });
})})
