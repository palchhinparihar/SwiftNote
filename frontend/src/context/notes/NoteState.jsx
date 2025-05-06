import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const host = "http://localhost:5000";

  // Get all notes
  const getAllNotes = async () => {
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
  const addNote = (title, description, tag) => {
    const note = {
      "_id": "6815a10be94a38655655656e4485825e8",
      "user": "680b1666f2ba2255f3cba92b",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2025-05-03T04:52:27.744Z",
      "__v": 0
    }

    setNotes(notes.concat(note));
  }

  // Delete a note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, getAllNotes, addNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

