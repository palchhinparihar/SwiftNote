import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const [state, setState] = useState({
    name: "Palchhin",
    age: "12"
  })

  return (
    <NoteContext.Provider value={state}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

