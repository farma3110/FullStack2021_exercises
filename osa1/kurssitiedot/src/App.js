import React from 'react'

const App = () => {
 const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const Header = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
      </div>      
    )
  }

  const Part = (props) => {
    return (
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <Part part={props.parts[0]}/>
        <Part part={props.parts[1]}/>
        <Part part={props.parts[2]}/>
      </div>
    )
  } 

  const Total = (props) => {
    let total = 0;
    let i = 0;
    for (i = 0; i < props.parts.length; i++) {
      total = total + props.parts[i].exercises;
    }
    return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
    )
  }

  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div> 
  )
} 

export default App
