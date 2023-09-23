import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="left-container">
          <h1>JOINER</h1>
          <div className="content">
            <div className="section">
              <h2>Discover Unseen Beauty</h2>
              <p>Your Adventure Awaits!</p>
            </div>
            <div className="section">
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <p className="forgot-password">Forgot Password?</p>
            </div>
          </div>
          <Link to="/dashboard">
            <button>Login</button>
          </Link>
          <p className="footer">Copyright 2023</p>
        </div>
        <div className="right-container">
          <p className="quote">“Experience is a wonderful thing.”</p>
        </div>
      </div>
    );
  }
}

export default Login;
