import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import '../Component/Modal.css';
import { deleteCustomerById, getCustomerById } from '../apiService';

export default function DeleteCustomer({ customer, onRefresh, toggleSuccessModal }) {
  const [currentCustomer, setCurrentCustomer] = useState({});
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
    setCurrentCustomer({});
    toggleModal();
  };

  // Function to handle the customer deletion
  const handleDeleteCustomer = async () => {
    try {
      await deleteCustomerById(currentCustomer.id);
      toggleModal();
      onRefresh();
      toggleSuccessModal();
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to fetch the customer details by its id and show the modal
  const handleGetCustomer = async (id) => {
    try {
      const customerById = await getCustomerById(id);
      setCurrentCustomer(customerById);
      toggleModal();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className='delete-container'>
        <IconButton className='delete-icon' fontSize='small' onClick={() => handleGetCustomer(customer.id)}>
          <DeleteIcon />
        </IconButton>
      </div>

      {modal && (
        <div className='modal'>
          <div className='overlay' />
          <div className='delete-modal-content'>
            <div className='delete-modal-header'>
              <h2>Are you sure you want to delete this customer? </h2>
            </div>
            <div className='delete-btn-container'>
              <button type='button' className='close-modal' onClick={handleCancel}>
                Cancel
              </button>
              <button type='button' className='delete-submit-close-modal' onClick={handleDeleteCustomer}>
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
