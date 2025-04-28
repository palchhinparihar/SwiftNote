import express from "express";
import { body, validationResult } from 'express-validator';
import Note from '../models/Note.js';
import fetchuser from "../middleware/fetchuser.js";

const router = express.Router();

// Validation rules for user input
let checkers = [
  body('title', 'Title must be atlast 5 characters').isLength({ min: 5 }),
  body('description', 'Description must be atlast 5 characters').isLength({ min: 5 }),
];

// ROUTE 1: GET /api/notes/fetchallnotes
// Desc: Create a new user (Login required)
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    // Check if a note or notes exists or not
    let notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    // Catch the error
    console.log(err.message);
    res.status(500).json({ error: 'Interal Server Error', message: err.message });
  }
});

// ROUTE 2: GET /api/notes/addnote
// Desc: Add a new note (Login required)
router.post('/addnote', fetchuser, checkers, async (req, res) => {
  // Check if there are any errors or not
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return a bad request
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { title, description, tag } = req.body;
    const note = new Note({
      user: req.user.id, title, description, tag
    });

    const savedNote = await note.save();
    res.json(savedNote);
  } catch (err) {
    // Catch the error
    console.log(err.message);
    res.status(500).json({ error: 'Interal Server Error', message: err.message });
  }
});

export default router;