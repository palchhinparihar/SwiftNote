import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import AlertContext from '../context/alert/AlertContext';

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Added successfully!", "success");
  }

  return (
    <div className="container py-3">
      <h2>Add a Note</h2>

      <form className="mt-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="title" value={note.title} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="tag">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote