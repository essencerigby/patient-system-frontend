import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { deletePatientById } from '../apiService';
import '../Component/Modal.css';

export default function DeletePatient({ patientId, onDeleteSuccess }) {
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /* handle the patient deletion, toggles the modal, and activates success modal */
  const handleDelete = async () => {
    try {
      await deletePatientById(patientId);
      setError(null);
      onDeleteSuccess();
      setShowModal(false);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    }
  };

  // open and close delete and success modals
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <IconButton>
        <DeleteIcon className='delete-icon' fontSize='small' onClick={handleShowModal} />
      </IconButton>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {showModal && (
        <div className='modal'>
          <div className='overlay' onClick={handleCloseModal} />
          <div className='delete-modal-content'>
            <div className='delete-modal-header'>
              <h2>Are you sure you want to delete this patient?</h2>
            </div>
            <div className='delete-btn-container'>
              <button type='button' className='close-modal' onClick={handleCloseModal}>
                Cancel
              </button>
              <button type='button' className='submit-close-delete-modal' onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
