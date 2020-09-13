import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            pisteet: 0,
            eniten: 0
        }
    }

    pisteet = [0, 0, 0, 0, 0, 0]
    maxNumber = 0
    maxIndex = 0

    render() {
        const findMaxIndex = () => {
            for (let i = 0; i < this.pisteet.length; i++) {
                if (this.pisteet[i] > this.maxNumber) {
                    this.maxNumber = this.pisteet[i]
                    this.maxIndex = i
                }
            }
        }
        const selectAnecdote = () => {
            let number = Math.floor(Math.random() * 6)
            findMaxIndex()
            this.setState({
                selected: number,
                pisteet: this.pisteet[number],
                eniten: this.maxIndex
            })
        }
        const voteUp = () => {
            this.pisteet[this.state.selected] += 1
            findMaxIndex()
            this.setState({
                pisteet: this.pisteet[this.state.selected],
                eniten: this.maxIndex
            })
        }
        return (
            <div>
                <p>{this.props.anecdotes[this.state.selected]}<br></br>
                    has {this.state.pisteet} votes</p>
                <button onClick={voteUp}>vote</button>
                <button onClick={selectAnecdote}>next anecdote</button>
                <h1>anecdote with most votes:</h1>
                <p>{this.props.anecdotes[this.state.eniten]}<br></br>
                    has {this.pisteet[this.state.eniten]} votes </p>
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)