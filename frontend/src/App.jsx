import Alert from "./components/Alert";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import AlertState from "./context/alert/AlertState";

function App() {

  return (
    <>
      <AlertState>
        <NoteState>
          <Router>
            <Navbar title="SwiftNote" />
            <Alert />

            <main className="container">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
              </Routes>
            </main>
          </Router>
        </NoteState>
      </AlertState>
    </>
  )
}

export default App;
