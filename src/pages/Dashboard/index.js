import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Cars from '../Cars';
import Users from '../Users';
import Rentals from '../Rentals';
import CarRentalUsers from '../CarRentalUsers';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: ''
    };
  }

  handleTabClick = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <div class="row">
        <div class="col-2 d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px', height: '97vh' }}>
          <h1 class="fs-4 text-center">JOINER</h1>
          <hr />
          <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
              <Link to="/dashboard/joiners" class={`nav-link fs-sidebar ${activeTab === '/dashboard/joiners' ? 'active-tab' : ''}`} aria-current="page" onClick={() => this.handleTabClick('/dashboard/joiners')}>
                <i class="fas fa-solid fa-user" style={{ paddingRight: '10px' }}></i>
                Joiners
              </Link>
            </li>
            <li>
              <Link to="/dashboard/carRentalUsers" class={`nav-link link-dark fs-sidebar ${activeTab === '/dashboard/carRentalUsers' ? 'active-tab' : ''}`} onClick={() => this.handleTabClick('/dashboard/carRentalUsers')}>
                <i class="fas fa-solid fa-user" style={{ paddingRight: '10px' }}></i>
                Car Rental Users
              </Link>
            </li>
            <li>
              <Link to="/dashboard/cars" class={`nav-link link-dark fs-sidebar ${activeTab === '/dashboard/cars' ? 'active-tab' : ''}`} onClick={() => this.handleTabClick('/dashboard/cars')}>
                <i class="fas fa-solid fa-car" style={{ paddingRight: '10px' }}></i>
                Cars
              </Link>
            </li>
            <li>
              <Link to="/dashboard/rentals" class={`nav-link link-dark fs-sidebar ${activeTab === '/dashboard/rentals' ? 'active-tab' : ''}`} onClick={() => this.handleTabClick('/dashboard/rentals')}>
                <i class="fas fa-solid fa-address-book" style={{ paddingRight: '10px' }}></i>
                Rentals
              </Link>
            </li>
          </ul>
          <hr />
          <div>
            <Link to="/" class="d-flex align-items-center text-decoration-none" aria-expanded="false">
              <strong style={{ paddingRight: '10px', paddingLeft: '10px' }}>Sign Out</strong>
              <i class="fas fa-sign-out-alt me-2"></i>
            </Link>
          </div>
        </div>
        <div class="col-10">
          <Switch>
            <Route path="/dashboard/users" component={Users} />
            <Route path="/dashboard/carRentalUsers" component={CarRentalUsers} />
            <Route path="/dashboard/cars" component={Cars} />
            <Route path="/dashboard/rentals" component={Rentals} />
          </Switch>
        </div>
      </div>
    );
  };
}

export default Dashboard;
