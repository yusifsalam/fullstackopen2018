import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    if (!req.query.weight || !req.query.height)
        res.json({ error: 'malformatted parameters' });
    else {
        const weight = Number(req.query.weight);
        const height = Number(req.query.height);
        const bmi = calculateBmi(height, weight);
        if (bmi === 'Error!') res.json({ error: 'malformatted parameters' });
        else {
            res.json({ weight, height, bmi });
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server runnig on port ${PORT}`);
});
