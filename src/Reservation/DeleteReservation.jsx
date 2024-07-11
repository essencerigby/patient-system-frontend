import React, { useState } from 'react';
import '../Component/Modal.css';
import { deleteReservation, getReservationById } from '../apiService';

export default function DeleteReservation({ reservation, onRefresh, toggleSuccessModal }) {
  const [currentReservation, setCurrentReservation] = useState({});
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);

  // Function to toggle the modal's visibility
  const toggleModal = () => {
    if (modal) {
      setError(null);
    }
    setModal(!modal);
  };

  // Function to handle the cancel action and close the modal
  const handleCancel = () => {
    setCurrentReservation({});
    toggleModal();
  };

  // Function to handle the reservation deletion
  const handleDeleteReservation = async () => {
    try {
      await deleteReservation(currentReservation.id);
      toggleModal();
      onRefresh();
      toggleSuccessModal();
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to fetch the reservation details by its id and show the modal
  const handleGetReservation = async (id) => {
    try {
      const reservationById = await getReservationById(id);
      setCurrentReservation(reservationById);
      toggleModal();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className='delete-container'>
        <button className='delete-icon' type='button' fontSize='small' onClick={() => handleGetReservation(reservation.id)}>Delete
        </button>
      </div>

      {modal && (
        <div className='modal'>
          <div className='overlay' />
          <div className='delete-modal-content'>
            <div className='delete-modal-header'>
              <h2>Are you sure you want to delete this reservation? </h2>
            </div>
            <div className='delete-btn-container'>
              <button type='button' className='close-modal' onClick={handleCancel}>
                Cancel
              </button>
              <button type='button' className='delete-submit-close-modal' onClick={handleDeleteReservation}>
                Delete
              </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      )}
    </>
  );
}
