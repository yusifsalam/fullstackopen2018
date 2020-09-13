import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { Table, Alert, Navbar, Nav, NavItem, Image, Grid, Col, Row } from "react-bootstrap";

const Menu = ({ anecdotes, addNew, anecdoteById, notification }) => (
  <Router>
    <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>Anecdote app</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem href="#">
              <Link to="/"> anecdotes </Link>
            </NavItem>
            <NavItem>
              <Link to="/create"> create new </Link>
            </NavItem>
            <NavItem>
              <Link to="/about"> about </Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Alert bsStyle='warning'>{notification}</Alert>
      <Route
        exact
        path="/"
        render={() => <AnecdoteList anecdotes={anecdotes} />}
      />
      <Route
        exact
        path="/create"
        render={() =>
          notification === "" ? (
            <CreateNew addNew={addNew} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route exact path="/about" render={() => <About />} />
      <Route
        exact
        path="/anecdotes/:id"
        render={({ match }) => (
          <Anecdote anecdote={anecdoteById(match.params.id)} />
        )}
      />
    </div>
  </Router>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote => (
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    {/* <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul> */}
  </div>
);

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

const About = () => (
  <Grid>
    <Row>
      <Col xs={6} md={6}>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
      </Col>
    <Col xs={6} md={4}>
    <Image src='/turing.jpg' responsive/>
    </Col>
    </Row>
  </Grid>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/TKT21009/121540749">
      Full Stack -sovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/mluukkai/routed-anecdotes">
      https://github.com/mluukkai/routed-anecdotes
    </a>{" "}
    for the source code.
  </div>
);

class CreateNew extends React.Component {
  constructor() {
    super();
    this.state = {
      content: "",
      author: "",
      info: ""
    };
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    });
  };

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content
            <input
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </div>
          <div>
            author
            <input
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </div>
          <div>
            url for more info
            <input
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
            />
          </div>
          <button>create</button>
        </form>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      anecdotes: [
        {
          content: "If it hurts, do it more often",
          author: "Jez Humble",
          info:
            "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
          votes: 0,
          id: "1"
        },
        {
          content: "Premature optimization is the root of all evil",
          author: "Donald Knuth",
          info: "http://wiki.c2.com/?PrematureOptimization",
          votes: 0,
          id: "2"
        }
      ],
      notification: ""
    };
  }

  addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `A new anecdote ${anecdote.content} created!`
    });
    setTimeout(() => {
      this.setState({ notification: "" });
    }, 10000);
  };

  anecdoteById = id => this.state.anecdotes.find(a => a.id === id);

  vote = id => {
    const anecdote = this.anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    const anecdotes = this.state.anecdotes.map(a => (a.id === id ? voted : a));

    this.setState({ anecdotes });
  };

  render() {
    return (
      <div>
        <h1>Software anecdotes</h1>
        <Menu
          anecdotes={this.state.anecdotes}
          addNew={this.addNew}
          anecdoteById={this.anecdoteById}
          notification={this.state.notification}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
