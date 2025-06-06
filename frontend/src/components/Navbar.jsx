import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext';

const Navbar = (props) => {
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    showAlert("Logged out successfully!", "success");
    setTimeout(() => {
      navigate("/login");
    }, 500);
  }
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">{props.title}</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/about">About</NavLink>
            </li>
          </ul>
          {localStorage.getItem("token") ?
            (<NavLink className="btn btn-primary mx-1" onClick={handleLogout} role="button">Logout</NavLink>) :
            (<form className="d-flex" role="search">
              <NavLink className="btn btn-primary mx-1" to="/login" role="button">Login</NavLink>
              <NavLink className="btn btn-primary mx-1" to="/signup" role="button">Signup</NavLink>
            </form>)}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
