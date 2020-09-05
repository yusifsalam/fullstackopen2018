export const calculateBmi = (height: number, mass: number): string => {
    const bmi: number = mass / (height / 100) ** 2
    switch (true) {
        case bmi < 15:
            return 'Very severely underweight'
        case bmi < 16:
            return 'Severely underweight'
        case bmi < 18.5:
            return 'Underweight'
        case bmi < 25:
            return 'Normal (healthy weight)'
        case bmi < 30:
            return 'Overweight'
        case bmi < 35:
            return 'Obese Class I (Moderately obese)'
        case bmi < 40:
            return 'Obese Class II (Severely obese)'
        case bmi >= 40:
            return 'Obese Class III (Very severely obese)'
        default:
            throw new Error('Something went wrong!')
    }
}

const runningAsScript = !module.parent
if (runningAsScript) {
    const a: number = Number(process.argv[2])
    const b: number = Number(process.argv[3])
    console.log(calculateBmi(a, b))
}
