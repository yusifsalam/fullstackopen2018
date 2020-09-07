import React from 'react'
import { CoursePart } from './types'

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
        case 'Fundamentals':
            return (
                <div style={{ border: '2px solid blue' }}>
                    <p>Name: {part.name}</p>
                    <p>Exercise count: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                </div>
            )
        case 'Using props to pass data':
            return (
                <div style={{ border: '2px solid red', marginTop: '1rem' }}>
                    <p>Name: {part.name}</p>
                    <p>Exercise count: {part.exerciseCount}</p>
                    <p>Group Project Count: {part.groupProjectCount}</p>
                </div>
            )
        case 'Deeper type usage':
            return (
                <div style={{ border: '2px solid green', marginTop: '1rem' }}>
                    <p>Name: {part.name}</p>
                    <p>Exercise count: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                    <p>
                        Exercise submission link: {part.exerciseSubmissionLink}{' '}
                    </p>
                </div>
            )
        case 'Fourth type':
            return (
                <div style={{ border: '2px solid magenta', marginTop: '1rem' }}>
                    <p>Name: {part.name}</p>
                    <p>Exercise count: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                </div>
            )
        default:
            return <div />
    }
}

export default Part
