import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note } = props;

  const handleDelete = () => {
    deleteNote(note._id);
  }

  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">

          <div className="d-flex justify-content-between">
            <h5 className="card-title fw-bold">{note.title}</h5>

            <div className="d-flex gap-2">
              <i className="fa-solid fa-pen-to-square" style={{ color: "#1374be" }} onClick={handleDelete}></i>
              <i className="fa-solid fa-trash" style={{ color: "#F74B4B" }}></i>
            </div>
          </div>

          <p className="card-text">{note.description}</p>
          <p className="card-text fst-italic fw-medium" style={{ fontSize: "14px", color: "#676767" }}>{note.tag}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem;