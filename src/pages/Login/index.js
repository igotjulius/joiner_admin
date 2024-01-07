import React, { Component } from 'react';
import './index.css';
import serverUrl from '../../serverUrl';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      showPassword: false,
      errorMessage: '',
    };
  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleTogglePassword = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  handleLogin = async () => {
    const {password } = this.state;

    const apiUrl = `${serverUrl}/a/login`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
        }),
      });


      if (response.ok) {
        this.props.history.push('/dashboard/joiners');
      } else {
        console.log('Login failed');
        this.setState({ errorMessage: 'Invalid Password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      this.setState({ errorMessage: 'Error during login' });
    }
  };

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
              <strong>Please enter the Admin Password</strong>
              <input
                type={this.state.showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
              <label>
                <input
                  type="checkbox"
                  onChange={this.handleTogglePassword}
                  checked={this.state.showPassword}
                  style={{marginRight: '5px'}}
                />
                Show Password
              </label>
              {this.state.errorMessage && (
                <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
              )}
            </div>
          </div>
          <button onClick={this.handleLogin}>Login</button>
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
