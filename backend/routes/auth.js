import express from "express";
import { body, validationResult } from 'express-validator';
import User from "../models/User.js";

const router = express.Router();

const checkers = [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
];

router.post('/', checkers, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({
            error: 'Please enter a unique value for email',
            message: err.message
        });
    }
});



export default router;