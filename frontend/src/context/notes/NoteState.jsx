import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const initalNotes = [
    {
      "_id": "6812f5f0d6f43f4b84e0167b",
      "user": "680b1666f2ba2255f3cba92b",
      "title": "Title 2",
      "description": "Descritpion 2",
      "tag": "Tag 2",
      "date": "2025-05-01T04:17:52.585Z",
      "__v": 0
    },
    {
      "_id": "6815a10be94a38e4485825e8",
      "user": "680b1666f2ba2255f3cba92b",
      "title": "Title 3",
      "description": "Descritpion 3",
      "tag": "Tag 3",
      "date": "2025-05-03T04:52:27.744Z",
      "__v": 0
    }
  ];

  const [notes, setNotes] = useState(initalNotes);

  return (
    <NoteContext.Provider value={{notes, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

