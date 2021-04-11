import React, { useState } from 'react'

const Votes = (props) => {
  return (
    <div>
	    <p>has {props.votes} votes</p>
	  </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.event}>
      {props.name}
    </button>
  )
}

const Most = (props) => {
  const sum = props.state.votes.reduce((a, b) => a + b, 0)
  if (sum === 0) {
    return (
      <p>No votes yet</p>
    )
  }
  return (
    <div>
      {props.anecdote}
      <Votes votes={props.state.most}/>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(
    {
    	index: 0,
    	votes: Array(6).fill(0),
    	most: 0,
    	most_index: 0
    }
  )

  const clickVote = () => {
    const most = selected.most
    const newState = Object.assign({}, selected)
    const newVotes = [...newState.votes]
    newVotes[selected.index] = newVotes[selected.index] + 1
    if (newVotes[selected.index] > most) {
      newState.most = newVotes[selected.index]
      newState.most_index = selected.index
    }
    newState.votes = newVotes
    setSelected(newState)
  }

  const clickNext = () => {
    const newState = Object.assign({}, selected)
    newState.index = Math.floor(Math.random() * 6)
    setSelected(newState)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected.index]}
      <Votes votes={selected.votes[selected.index]}/>
      <Button name='vote' event={clickVote}/>
      <Button name='next anecdote' event={clickNext}/>
      <h1>Anecdote with most votes</h1>
      <Most state={selected} anecdote={anecdotes[selected.most_index]}/>
    </div>
  )
}

export default App
