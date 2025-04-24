import express from "express";
import { body, validationResult } from 'express-validator';
import User from "../models/User.js";

const router = express.Router();

const checkers = [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
];

router.post('/createuser', checkers, async (req, res) => {
    // Check if there are any errors or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Return a bad request
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if a user with same email exists or not
        let user = await User.findOne({ email: req.body.email });
        if(user) {
            return res.status(400).json({ error: "Sorry, a user with this email already exists." });
        }

        // Save the data into "users" table/connection in the db
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        res.json(user);
    } catch (err) {
        // Catch the error
        console.log(err.message);
        res.status(500).json({ error: 'Interal Server Error', message: err.message });
    }
});

export default router;