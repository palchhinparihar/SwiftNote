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
        "auth-token": localStorage.getItem("token")
      }
    });
    const data = await response.json();
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    // Frontend validation before sending the request to the backend
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required!");
      return; // Prevent sending a blank note
    }

    if (title.length < 5 || description.length < 5) {
      alert("Both title and description must be at least 5 characters long.");
      return;
    }    

    // Add the note in the backend
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });
    const data = await response.json();

    // Add that note in the frontend
    setNotes(notes.concat(data.savedNote));
  }

  // Delete a note
  const deleteNote = async (id) => {
    // Delete a note from backend
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      }
    });

    // Delete the note from frontend
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // Frontend validation before sending the request to the backend
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required!");
      return; // Prevent sending a blank note
    }

    if (title.length < 5 || description.length < 5) {
      alert("Both title and description must be at least 5 characters long.");
      return;
    }   
    
    // Update a note from backend
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });

    // Update the note in the frontend
    const newNotes = notes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, getAllNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

