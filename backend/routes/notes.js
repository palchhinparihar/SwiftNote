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
  
  const { title, description, tag } = req.body;

  try {
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

// ROUTE 3: PUT /api/notes/updatenote/:id
// Desc: Update an existing note (Login required)
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Build newNote object with updated fields
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }

    // Check if the current user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!");
    }

    // Update the note and return the updated document
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });
  } catch (err) {
    // Handle server errors
    console.log(err.message);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// ROUTE 3: DELETE /api/notes/deletenote/:id
// Desc: Delete an existing note (Login required)
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }

    // Check if the current user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!");
    }

    // Delete the note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "Success" : "Given Note has been deleted successfully!", note: note });
  } catch (err) {
    // Handle server errors
    console.log(err.message);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

export default router;