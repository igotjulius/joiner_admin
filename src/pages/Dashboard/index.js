import React, { Component } from 'react';
import {Link,} from 'react-router-dom';
import './index.css';
import CarFormModal from './CarFormModal';
import Login from '../Login';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
      carData: [],
      newCarName: '',
      newCarID: '',
      isModalOpen: false,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleCreateData = this.handleCreateData.bind(this);
    this.deleteCar = this.deleteCar.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  handleNewCarID = (e) => {
    this.setState({ newCarID: e.target.value });
  };

  handleNewCarName = (e) => {
    this.setState({ newCarName: e.target.value });
  };

  fetchData = async () => {
    try {
      const response = await fetch('https://joiner-backend-v2.onrender.com/admin/car', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        this.setState({ carData: data });
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  handleCreateData = async (newCarID, newCarName) => {
    try {
      const response = await fetch('https://joiner-backend-v2.onrender.com/admin/car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          licensePlate: newCarID,
          vehicleType: newCarName,
          availability: 'Available',
        }),
      });

      if (response.ok) {
        this.fetchData();
        this.setState({ newCarID: '', newCarName: '' });
      } else {
        console.error('Failed to create data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  deleteCar = async (licensePlate) => {
    try {
      const response = await fetch('https://joiner-backend-v2.onrender.com/admin/car', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ licensePlate }),
      });

      if (response.ok) {
        this.fetchData();
      } else {
        console.error('Failed to delete data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  handleTabChange = (tabIndex) => {
    this.setState({ selectedTab: tabIndex });
  };

  toggleModal = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
        return (
          <div className="row dashboard-container">
            <div className="col sidebar">
              <h2>Joiner</h2>
              <Switch>
                <Route path='/login' component={Login}/>
              </Switch>
              <div className="tabs">
                <div
                  className={`tab ${this.state.selectedTab === 0 ? 'selected' : ''}`}
                  onClick={() => this.handleTabChange(0)}
                >
                  <div className="tab-icon">
                  <i className="fas fa-tachometer-alt"></i>
                  </div>
                  <div className="tab-label">Dashboard</div>
                </div>
                <div
                  className={`tab ${this.state.selectedTab === 1 ? 'selected' : ''}`}
                  onClick={() => this.handleTabChange(1)}
                >
                  <div className="tab-icon">
                    <i className="fas fa-credit-card"></i>
                  </div>
                  <div className="tab-label">Transactions</div>
                </div>
                <div
                  className={`tab ${this.state.selectedTab === 2 ? 'selected' : ''}`}
                  onClick={() => this.handleTabChange(2)}
                >
                  <div className="tab-icon">
                  <i className="fas fa-handshake"></i>
                  </div>
                  <div className="tab-label">Rentals</div>
                </div>
                <div
                  className={`tab ${this.state.selectedTab === 3 ? 'selected' : ''}`}
                  onClick={() => this.handleTabChange(3)}
                >
                  <div className="tab-icon">
                  <i className="fas fa-car"></i>
                  </div>
                  
                  <div className="tab-label">Cars</div>
                </div>
                <Link to = '/login' style={{textDecoration: 'none', color: 'black'}}>
                  <div className="tab">
                    <div className="tab-icon">
                    <i className="fas fa-sign-out-alt"></i>
                    </div>
                    <div className="tab-label">Logout</div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="main-content">
              <div className="content-header">
                <h1>Dashboard</h1>
              </div>
              <hr className="divider" />
              <div className="tab-content">
                {this.state.selectedTab === 0 && (
                  <div className="tab-image">
                    <img src={require('./Frame_96_(1).png')} alt="Number of Users" />
                    <img src={require('./Frame_97.png')} alt="Transactions" />
                  </div>
                )}
                {this.state.selectedTab === 1 && (
                  <div className="tab-image">
                    <img src={require('./Frame_96_(2).png')} alt="Transaction History" />
                  </div>
                )}
                {this.state.selectedTab === 2 && (
                  <div className="tab-image">
                    <img src={require('./Frame_96_(3).png')} alt="Rentals" />
                  </div>
                )}
                {this.state.selectedTab === 3 && (
                  <div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h3>Car Availability</h3>
                    <button className="add-car-button" onClick={this.toggleModal}>
                      <i className="fas fa-plus"></i> Add Car
                    </button>
                  </div>
                    <CarFormModal
                      isOpen={this.state.isModalOpen}
                      onClose={this.toggleModal}
                      onSubmit={this.handleCreateData}
                      newCarID={this.state.newCarID}
                      newCarName={this.state.newCarName}
                      handleNewCarID={this.handleNewCarID}
                      handleNewCarName={this.handleNewCarName}
                    />
                    <table className="car-table">
                    <thead>
                      <tr>
                        <th>License Plate</th>
                        <th>Transaction ID</th>
                        <th>Vehicle Type</th>
                        <th>Availability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.carData.map((car)  => (
                        <tr key={car._id}>
                          <td>{car._id}</td>
                          <td>{}</td>
                          <td>{car.vehicleType}</td>
                          <td>{car.availability}</td>
                          <td style={{ border: 'none', outline: 'none', width: "20px", tableDecoration: "none"}}>
                            <button onClick={() => this.deleteCar(car._id)} className="delete-car-button">
                            <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                )}
              </div>
            </div>  
          </div>
        );
    };
}
export default Dashboard;
