import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (tabIndex) => {
    setSelectedTab(tabIndex);
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
            <div className="tab-image">
              <img src={require('./Frame 96.png')} alt="Cars" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
