import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
