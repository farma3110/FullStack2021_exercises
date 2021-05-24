import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
    </div>      
  )
}

const Part = ({ name, exercises }) => {
  return (
  <div>
    <p>{name} {exercises}</p>
  </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0)
  return (
  <div>
    <h4>total of {total} exercises</h4>
  </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course