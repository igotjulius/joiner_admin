import React from 'react';
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
};

const CarFormModal = ({ isOpen, onClose, onSubmit, newCarID, newCarName, handleNewCarID, handleNewCarName }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Car Modal"
      ariaHideApp={false}
      style = {customStyles}
    >
      <div className="modal-content">
        <h2>Enter Car Details</h2>
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
        <button className="add-car-button-modal" onClick={onSubmit}>
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
