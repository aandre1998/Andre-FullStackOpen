import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ key, course }) => {
    const exercises = course.parts.map(part => part.exercises);

    return (
        <>
            <Header name={course.name}/>
            <Content key={key} parts={course.parts}/>
            <Total exercises={exercises}/>
        </>
    )
}

export default Course;