import React from 'react';
import Notes from './Notes';
import AddNote from './AddNote';

const Home = () => {
  return (
    <section>
      <AddNote />
      <Notes />
    </section>
  )
}

export default Home;
