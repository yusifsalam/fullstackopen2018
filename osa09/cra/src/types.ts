interface CoursePartBase {
    name: string
    exerciseCount: number
}

interface CoursePartWithDescription extends CoursePartBase {
    description: string
}

interface CoursePartOne extends CoursePartWithDescription {
    name: 'Fundamentals'
    description: string
}

interface CoursePartTwo extends CoursePartBase {
    name: 'Using props to pass data'
    groupProjectCount: number
}

interface CoursePartThree extends CoursePartBase {
    name: 'Deeper type usage'
    description: string
    exerciseSubmissionLink: string
}

interface CoursePartFour extends CoursePartBase {
    name: 'Fourth type'
    description: string
}
export type CoursePart =
    | CoursePartOne
    | CoursePartTwo
    | CoursePartThree
    | CoursePartFour
