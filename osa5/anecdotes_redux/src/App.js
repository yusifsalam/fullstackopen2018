import React from "react";
class App extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.store.dispatch({
      type: 'NEW',
      data: {
        content: event.target.content.value
      }
    })
    event.target.content.value = ''
  };
  render() {
    const anecdotes = this.props.store.getState();
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((one, two) => two.votes - one.votes).map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={e =>
                  this.props.store.dispatch({
                    type: "UPVOTE",
                    data: { id: anecdote.id }
                  })
                }
              >
                vote
              </button>
            </div>
          </div>
        ))}
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="content" />
          </div>
          <button>create</button>
        </form>
      </div>
    );
  }
}

export default App;
