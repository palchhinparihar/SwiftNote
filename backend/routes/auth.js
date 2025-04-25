import express from "express";
import { body, validationResult } from 'express-validator';
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = "1#P5Qah9m0";

// Validation rules for user input
const checkers = [
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid password').isLength({ min: 5 }),
];

// Route: POST /api/auth/createuser
// Desc: Create a new user
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

    // Hashing the password with salt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Save the data into "users" table/connection in the db
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    });

    // Prepare payload for JWT
    const data = {
      user: {
        id: user.id 
      }
    };

    // Generate auth token
    const authToken = jwt.sign(data, JWT_SECRET);

    res.json({authToken});
  } catch (err) {
    // Catch the error
    console.log(err.message);
    res.status(500).json({ error: 'Interal Server Error', message: err.message });
  }
});

export default router;