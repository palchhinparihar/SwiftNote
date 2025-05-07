import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const host = "http://localhost:5000";

  // Get all notes
  const getAllNotes = async () => {
    // Get the notes from the backend
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgwYjE2NjZmMmJhMjI1NWYzY2JhOTJiIn0sImlhdCI6MTc0NTcyNzk0M30.W8pgEEctU42gTMDR9P62qesGKmNq-4TiDnFpurFpez8"
      }
    });
    const data = await response.json();
    setNotes(data);
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    // Add the note in the backend
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgwYjE2NjZmMmJhMjI1NWYzY2JhOTJiIn0sImlhdCI6MTc0NTcyNzk0M30.W8pgEEctU42gTMDR9P62qesGKmNq-4TiDnFpurFpez8"
      },
      body: JSON.stringify({title, description, tag})
    });
    const data = await response.json();

    // Add that note in the frontend
    setNotes(notes.concat(data));
  }

  // Delete a note
  const deleteNote = async (id) => {
    // Delete a note from backend
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgwYjE2NjZmMmJhMjI1NWYzY2JhOTJiIn0sImlhdCI6MTc0NTcyNzk0M30.W8pgEEctU42gTMDR9P62qesGKmNq-4TiDnFpurFpez8"
      }
    });
    const data = await response.json();
    console.log(data);

    // Delete the note from frontend
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  // Edit a note
  const editNote = (id, title, description, tag) => {
    notes.forEach(note => {
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }
    });
  }

  return (
    <NoteContext.Provider value={{ notes, getAllNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

