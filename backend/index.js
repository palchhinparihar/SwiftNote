import express from "express";
import cors from "cors";

import connectToMongo from "./db.js";
import authRoutes from './routes/auth.js';
import notesRoutes from "./routes/notes.js";

const app = express();
const port = 5000;

connectToMongo();

// Enable all CORS requests
app.use(cors())

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello main page!');
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});