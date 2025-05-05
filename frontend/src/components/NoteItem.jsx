import React from 'react';

const NoteItem = (props) => {
  const { note } = props;

  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">

          <div className="d-flex justify-content-between">
            <h5 className="card-title fw-bold">{note.title}</h5>

            <div className="d-flex gap-2">
              <i className="fa-solid fa-pen-to-square" style={{ color: "#1374be" }}></i>
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