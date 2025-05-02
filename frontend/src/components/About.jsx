import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const About = () => {
  const user = useContext(NoteContext);

  return (
    <div>
      This is about page of {user.name} with age of {user.age}
    </div>
  )
}

export default About;
