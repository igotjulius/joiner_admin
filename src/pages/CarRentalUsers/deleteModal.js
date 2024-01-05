import React from 'react';

const deleteModal = ({ userId, onCancel, onConfirm }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <p className="text-center fs-6" style={{ fontSize: '20px' }}>
                    {`Are you sure you want to disable/enable `}<br/>
                    <strong>User ID: {userId}</strong>
                    {`?`}
                </p>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        <button className="btn btn-secondary btn-m mr-2" onClick={onCancel}>
                            Cancel
                        </button>
                        <button className="btn btn-danger btn-m" onClick={onConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default deleteModal;
