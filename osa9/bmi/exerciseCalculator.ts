interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const calculateExercise = (days: Array<number>, target: number): Result => {
    const daysCount = days.length
    const trainingDays = daysCount - days.filter((day) => day === 0).length
    const average = days.reduce((a, b) => a + b) / daysCount
    const ratio = average / target
    const rating = ratio <= 0.9 ? 0 : ratio <= 1 ? 1 : ratio <= 1.1 ? 2 : 3
    const ratingDescription =
        rating === 1
            ? 'try trying'
            : rating === 2
            ? 'not bad but could be better'
            : rating === 3
            ? 'well done'
            : 'something went wrong, huh'
    return {
        periodLength: daysCount,
        trainingDays: trainingDays,
        success: average >= target ? true : false,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    }
}

console.log(calculateExercise([3, 5, 2, 4.5, 0, 3, 1], 2))
