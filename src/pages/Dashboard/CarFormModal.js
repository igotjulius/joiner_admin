import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '36px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    width: '500px',
    textAlign: 'center',

  },

  setError: {color: 'red'}
};

const CarFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [newCarID, setNewCarID] = useState('');
  const [newCarName, setNewCarName] = useState('');
  const [error, setError] = useState('');

  const handleNewCarID = (e) => {
    setNewCarID(e.target.value);
  };

  const handleNewCarName = (e) => {
    setNewCarName(e.target.value);
  };

  const handleSubmit = () => {
    if (!newCarID || !newCarName) 
    {
      setError('Please fill in all fields.');
    }

    else 
    {
      setError('');
      onSubmit(newCarID, newCarName);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Car Modal"
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="modal-content">
        <h2>Enter Car Details</h2>
        {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
        <input
          type="text"
          placeholder="Enter Car License Plate"
          value={newCarID}
          onChange={handleNewCarID}
        />
        <input
          type="text"
          placeholder="Enter Car Name/Vehicle Type"
          value={newCarName}
          onChange={handleNewCarName}
        />
        <button className="add-car-button-modal" onClick={handleSubmit}>
          Add Car
        </button>
        <button className="add-car-button-modal" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CarFormModal;
