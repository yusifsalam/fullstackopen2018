let token = null;

const blogs = [
  {
    id: "5bc750da1db82d2454f9b24d",
    title: "Creating a new blog",
    author: "Albert Einstein",
    url: "facebook.com",
    likes: 10,
    user: {
      _id: "5bc609ba5feb1e161c67d012",
      username: "salamy",
      name: "Dr. Salamy"
    }
  },
  {
    id: "5bc75e965602cebdf5b70332",
    title: "Chicken ",
    author: "Adolf",
    url: "https://fullstackopen.github.io/",
    likes: 0,
    user: {
      _id: "5bc75a66ab1831bac8b4502f",
      username: "root"
    }
  }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default {getAll, blogs}