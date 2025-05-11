import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext';

const Signup = () => {
  const navigate = useNavigate();
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = credentials;
    if (name.length < 5 || password.length < 5) {
      showAlert("Both name and password must be at least 5 characters long!", "danger");
      return;
    }

    if (password !== cpassword) {
      showAlert("Passwords don't match!", "danger");
      return;
    }
    
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate("/");
      showAlert("Account created successfully!", "success");
    }
    else {
      showAlert("Invalid credentials!", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="container">
      <h2 className="pt-5 pb-3">Sign up to use SwiftNote!</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password:</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup;
