import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext';

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      showAlert("Logged in successfully!", "success");
    }
    else {
      showAlert("Invalid credentials!", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="container py-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    </div>
  )
}

export default Login;
