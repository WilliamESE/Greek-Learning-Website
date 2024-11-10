// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css";

const Login = ({onLogin}) => {
    // State to store user inputs and token
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(sessionStorage.getItem('token') || '');
    const [userid, setUserid] = useState(sessionStorage.getItem('userid') || 0);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page reload

        try {
            // Make POST request to the server’s login endpoint
            const response = await axios.post('/login', {
              username: username,
              password: password,
            });

            // Save token in state if login is successful
            setError(''); // Clear any previous error
            onLogin(response.data.token, response.data.id, response.data.admin);
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid username or password');
        }
    };

    return (
      <div className="login-container">
          <h1>Login</h1>
          <div style={{ minHeight: '25px', color: 'red', textAlign: 'center' }}>
              {error && <p className="error-message">Invalid username or password</p>}
          </div>
          <form onSubmit={handleSubmit}>
              <div>
                  <label>Username:</label>
                  <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{
                        borderColor: error ? 'red' : '',
                        borderWidth: error ? '2px' : '',
                      }}
                  />
              </div>
              <div>
                  <label>Password:</label>
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        borderColor: error ? 'red' : '',
                        borderWidth: error ? '2px' : '',
                      }}
                  />
              </div>
              <button type="submit">Login</button>
          </form>
      </div>
    );
};

export default Login;
