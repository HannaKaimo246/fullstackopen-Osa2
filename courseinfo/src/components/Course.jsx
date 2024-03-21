import React from 'react'

const Course = (props) => {

    return (
      <div>
        <Header header={props.course.name}/>
        {props.course.parts.map(part => (
          <Content key={part.id} content={part} />
           ))}
           <Total total={props.course.parts.reduce((i, part) => i + part.exercises, 0)} />
    </div>
    )
  }

  const Header = (props) => {
    return (
      <h2>
        {props.header} 
      </h2>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        <Part name={props.content.name} exercises={props.content.exercises}/>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <strong><div style={{color:'red'}}>
        Total of {props.total} exercises
      </div></strong>
    )
  }


export default Course
