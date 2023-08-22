import React from 'react';
import './App.css';

const App = () => {
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
        <button>Login</button>
        <p className="footer">Copyright 2023</p>
      </div>
      <div className="right-container">
        <p className="quote">“Experience is a wonderful thing.”</p>
      </div>
    </div>
  );
};

export default App;
