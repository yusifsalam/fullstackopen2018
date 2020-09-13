import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
    if (!req.query.weight || !req.query.height)
        res.json({ error: "malformatted parameters" });
    else {
        const weight = Number(req.query.weight);
        const height = Number(req.query.height);
        const bmi = calculateBmi(height, weight);
        if (bmi === "Error!") res.json({ error: "malformatted parameters" });
        else {
            res.json({ weight, height, bmi });
        }
    }
});

interface Body {
    daily_exercises: number[];
    target: number;
}

app.post("/exercises", (req, res) => {
    const input: Body = req.body as Body;
    if (!input.target || !input.daily_exercises)
        res.json({ error: "parameters missing" });
    else if (isNaN(Number(input.target)) || input.daily_exercises.some(isNaN))
        res.json({ error: "malformatted parameters" });
    else {
        const exercise = calculateExercise(input.target, input.daily_exercises);
        res.json(exercise);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server runnig on port ${PORT}`);
});
