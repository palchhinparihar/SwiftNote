import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const initalNotes = [
    {
      "_id": "6812f54535f0d6f43f4b84e0167b",
      "user": "680b1666f2ba2255f3cba92b",
      "title": "Title 2",
      "description": "Descritpion 2",
      "tag": "Tag 2",
      "date": "2025-05-01T04:17:52.585Z",
      "__v": 0
    },
    {
      "_id": "6815a104534be94a38e4485825e8",
      "user": "680b1666f2ba2255f3cba92b",
      "title": "Title 3",
      "description": "Descritpion 3",
      "tag": "Tag 3",
      "date": "2025-05-03T04:52:27.744Z",
      "__v": 0
    },
    {
      "_id": "6812f5f0d6f43f45434b84e0167b",
      "user": "680b1666f2ba2255f3cba92b",
      "title": "Title 2",
      "description": "Descritpion 2",
      "tag": "Tag 2",
      "date": "2025-05-01T04:17:52.585Z",
      "__v": 0
    },
    {
      "_id": "6815a10be94a38e5434354485825e8",
      "user": "680b1666f2ba2255f3cba92b",
      "title": "Title 3",
      "description": "Descritpion 3",
      "tag": "Tag 3",
      "date": "2025-05-03T04:52:27.744Z",
      "__v": 0
    },
    {
      "_id": "6812f5f0d453546f43f4b84e0167b",
      "user": "680b1666f2ba2255f3cba92b",
      "title": "Title 2",
      "description": "Descritpion 2",
      "tag": "Tag 2",
      "date": "2025-05-01T04:17:52.585Z",
      "__v": 0
    },
    {
      "_id": "6815a10be94a386556e4485825e8",
      "user": "680b1666f2ba2255f3cba92b",
      "title": "Title 3",
      "description": "Descritpion 3",
      "tag": "Tag 3",
      "date": "2025-05-03T04:52:27.744Z",
      "__v": 0
    }
  ];

  const [notes, setNotes] = useState(initalNotes);

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
    <NoteContext.Provider value={{ notes, addNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

