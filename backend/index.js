import express from "express";
import connectToMongo from "./db.js";

const app = express();
const port = 3000;

connectToMongo();

app.get('/', (req, res) => {
    res.send('Hello main page!');
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})