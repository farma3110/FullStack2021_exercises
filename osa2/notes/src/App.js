import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification.js'
import noteService from './services/notes.js'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [errorMessage] = useState('some error happened...')

  const hook = () => {
  	noteService
      .getAll()
      .then(initialNotes => {
	  	  setNotes(initialNotes)
	    })
  }

  useEffect(hook, [])

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
  	console.log(event.target.value)
  	setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const noteToChange = notes.find(n => n.id === id)
    const changedNote = { ...noteToChange, important: !noteToChange.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        alert(`the note ${noteToChange.content} was already deleted from server`)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }

    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
      </div>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        { notes.map(note =>
          (<Note
            className='note'
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />)
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App

