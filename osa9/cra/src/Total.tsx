import React from 'react'
import { CourseParts } from './types'

const Total: React.FC<{ courseParts: CourseParts[] }> = ({ courseParts }) => {
    return (
        <div>
            <p>
                Number of exercises{' '}
                {courseParts.reduce(
                    (carry, part) => carry + part.exerciseCount,
                    0
                )}
            </p>
        </div>
    )
}

export default Total
