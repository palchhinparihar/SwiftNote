import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';
import AlertContext from '../context/alert/AlertContext';

import NoteItem from './NoteItem';
import UpdateNote from './UpdateNote';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getAllNotes, editNote } = context;
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    } else {
      navigate("/login");
    }
  }, []);

  const ref = useRef();
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag || "General" });
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    showAlert("Updated successfully!", "success");
  }

  return (
    <>
      <UpdateNote ref={ref} note={note} onChange={onChange} handleSubmit={handleSubmit} />

      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote} />
        })}
      </div>
    </>
  )
}

export default Notes;
