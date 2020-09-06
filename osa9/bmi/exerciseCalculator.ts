interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercise = (
    target: number,
    days: Array<number>
): Result => {
    const daysCount = days.length;
    const trainingDays = daysCount - days.filter((day) => day === 0).length;
    const average = days.reduce((a, b) => a + b) / daysCount;
    const ratio = average / target;
    const rating = ratio <= 1 ? 1 : ratio <= 1.1 ? 2 : 3;
    const ratingDescription =
        rating === 1
            ? "try trying"
            : rating === 2
            ? "not bad but could be better"
            : rating === 3
            ? "well done"
            : "something went wrong, huh";
    return {
        periodLength: daysCount,
        trainingDays: trainingDays,
        success: average >= target ? true : false,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    };
};

interface ParsedArgs {
    target: number;
    arr: Array<number>;
}

const parseArgs = (args: Array<string>): ParsedArgs => {
    if (args.length < 4) throw new Error("Not enough arguments!");
    const argus = args.slice(2);
    const target = Number(argus[0]);
    const arrNumbers = argus.slice(1).map((n) => Number(n));
    const arrValid = arrNumbers.filter((n) => isNaN(n)).length === 0;
    if (!isNaN(target) && arrValid) {
        return {
            target,
            arr: arrNumbers,
        };
    } else {
        throw new Error("Provided values are not numbers");
    }
};

const runningAsScript = !module.parent;
if (runningAsScript) {
    try {
        const { target, arr } = parseArgs(process.argv);
        console.log(calculateExercise(target, arr));
    } catch (e) {
        if (e instanceof Error)
            console.log("Something went wrong, message: ", e.message);
    }
}
