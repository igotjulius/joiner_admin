import React from 'react';

const CarFormModal = ({ isOpen, onClose, onSubmit, newCarID, newCarName,
     handleNewCarID, handleNewCarName }) => {
  
    return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Add Car</h2>
        <input
          type="text"
          placeholder="Enter Car License Plate"
          value={newCarID}
          onChange={handleNewCarID}
        />
        <input
          type="text"
          placeholder="Enter Car Name"
          value={newCarName}
          onChange={handleNewCarName}
        />
        <button onClick={onSubmit}>Add Car</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CarFormModal;
