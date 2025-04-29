require('dotenv').config();
const express = require('express');
const mfp = require('myfitnesspal');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        const client = new mfp.Client();
        await client.login(process.env.MFP_USERNAME, process.env.MFP_PASSWORD);

        const data = await client.getDate(new Date());
        const nutrition = data.totals;

        res.json({
            date: new Date().toLocaleDateString(),
            calories: nutrition.calories,
            protein: nutrition.protein,
            carbs: nutrition.carbohydrates,
            fat: nutrition.fat,
            weight: data.weight || 'Not available'
        });
    } catch (error) {
        res.status(500).send('Error fetching data from MyFitnessPal: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});