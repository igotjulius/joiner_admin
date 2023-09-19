import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import CarFormModal from './CarFormModal';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [carData, setCarData] = useState([]);
  const [newCarName, setNewCarName] = useState('');
  const [newCarID, setNewCarID] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  
  const handleNewCarID = (e) => {
    setNewCarID(e.target.value);
  };

  const handleNewCarName = (e) => {
    setNewCarName(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://joiner-backend-v2.onrender.com/admin/car', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setCarData(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleCreateData = async () => {
    try {
      const response = await fetch('https://joiner-backend-v2.onrender.com/admin/car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          licensePlate: newCarID,
          vehicleType: newCarName,
          availability: "Available" }), 
      });
      console.log (response)
      if (response.ok) {
        fetchData(); 
        setNewCarID('');
        setNewCarName('');
      } else {
        console.error('Failed to create data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleTabChange = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    console.log(isModalOpen); // Add this line for debugging
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Joiner</h2>
        <div className="tabs">
          <div
            className={`tab ${selectedTab === 0 ? 'selected' : ''}`}
            onClick={() => handleTabChange(0)}
          >
            <div className="tab-icon">
            </div>
            <div className="tab-label">Dashboard</div>
          </div>
          <div
            className={`tab ${selectedTab === 1 ? 'selected' : ''}`}
            onClick={() => handleTabChange(1)}
          >
            <div className="tab-icon">
            </div>
            <div className="tab-label">Transactions</div>
          </div>
          <div
            className={`tab ${selectedTab === 2 ? 'selected' : ''}`}
            onClick={() => handleTabChange(2)}
          >
            <div className="tab-icon">
            </div>
            <div className="tab-label">Rentals</div>
          </div>
          <div
            className={`tab ${selectedTab === 3 ? 'selected' : ''}`}
            onClick={() => handleTabChange(3)}
          >
            <div className="tab-icon">
            </div>
            <div className="tab-label">Cars</div>
          </div>
          <div className="tab">
            <div className="tab-icon">
            </div>
            <div className="tab-label">Logout</div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="content-header">
          <h2>Dashboard</h2>
        </div>
        <hr className="divider" />
        <div className="tab-content">
          {selectedTab === 0 && (
            <div className="tab-image">
              <img src={require('./Frame_96_(1).png')} alt="Number of Users" />
              <img src={require('./Frame_97.png')} alt="Transactions" />
            </div>
          )}
          {selectedTab === 1 && (
            <div className="tab-image">
              <img src={require('./Frame_96_(2).png')} alt="Transaction History" />
            </div>
          )}
          {selectedTab === 2 && (
            <div className="tab-image">
              <img src={require('./Frame_96_(3).png')} alt="Rentals" />
            </div>
          )}
          {selectedTab === 3 && (
            <div>
            <button className="add-car-button" onClick={toggleModal}>Add Car</button>
            <CarFormModal
              isOpen={isModalOpen}
              onClose={toggleModal}
              onSubmit={handleCreateData}
              newCarID={newCarID}
              newCarName={newCarName}
              handleNewCarID={handleNewCarID}
              handleNewCarName={handleNewCarName}
            />
              <table className="car-table">
              <thead>
                <tr>
                  <th>License Plate</th>
                  <th>Car Name</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {carData.map((car) => (
                  <tr key={car.id}>
                    <td>{car._id}</td>
                    <td>{car.vehicleType}</td>
                    <td>{car.availability}</td>
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

export default Dashboard;
