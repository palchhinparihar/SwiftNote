import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const handleDelete = () => {
    deleteNote(note._id);
  }

  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body px-3">

          <div className="d-flex justify-content-between gap-2">
            <h5 className="card-title fw-bold text-wrap" style={{minWidth : "138px" }}>{note.title}</h5>

            <div className="d-flex gap-2">
              <i className="fa-solid fa-pen-to-square" style={{ color: "#1374be" }} onClick={() => { updateNote(note) }}></i>
              <i className="fa-solid fa-trash" style={{ color: "#F74B4B" }} onClick={handleDelete}></i>
            </div>
          </div>

          <p className="card-text text-wrap" style={{minWidth : "138px" }}>{note.description}</p>
          <p className="card-text fst-italic fw-medium" style={{ fontSize: "14px", color: "#676767" }}>{note.tag ? note.tag : "General"}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem;