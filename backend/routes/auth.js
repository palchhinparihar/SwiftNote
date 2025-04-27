import express from "express";
import { body, validationResult } from 'express-validator';
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import fetchuser from "../middleware/fetchuser.js";

const router = express.Router();
const JWT_SECRET = "1#P5Qah9m0";

// Validation rules for user input
let checkers = [
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid password').isLength({ min: 5 }),
];

// ROUTE 1: POST /api/auth/createuser
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
    if (user) {
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
    const payloadData = {
      user: {
        id: user.id
      }
    };

    // Generate auth token
    const authToken = jwt.sign(payloadData, JWT_SECRET);

    res.json({ authToken });
  } catch (err) {
    // Catch the error
    console.log(err.message);
    res.status(500).json({ error: 'Interal Server Error', message: err.message });
  }
});

checkers = [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
];

// ROUTE 2: POST /api/auth/login
// Desc: Login a user
router.post('/login', checkers, async (req, res) => {
  // Check if there are any errors or not
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return a bad request
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if a user with the email exists or not
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please enter the correct credentials" });
    }

    // Password validation
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please enter the correct credentials" });
    }

    // Prepare payload for JWT
    const payloadData = {
      user: {
        id: user.id
      }
    };

    // Generate auth token
    const authToken = jwt.sign(payloadData, JWT_SECRET);

    res.json({ authToken });
  } catch (err) {
    // Catch the error
    console.log(err.message);
    res.status(500).json({ error: 'Interal Server Error', message: err.message });
  }
});

// ROUTE 3: POST /api/auth/getuser
// Desc: Get user's details via the jwt token
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    // Fetch the user's details except password using the id
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (err) {
    // Catch the error
    console.log(err.message);
    res.status(500).json({ error: 'Interal Server Error', message: err.message });
  }
});

export default router;