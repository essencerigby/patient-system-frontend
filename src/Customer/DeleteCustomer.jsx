import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import '../Component/Modal.css';
import { deleteCustomerById, getCustomerById } from '../apiService';
import DeletionSuccessModal from '../Component/DeletionSuccessModal';

export default function DeleteCustomer({ customer, onRefresh }) {
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [modal, setModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [error, setError] = useState(null);

  const toggleModal = () => {
    if (modal) {
      setError(null);
    }
    setModal(!modal);
  };

  const handleCancel = () => {
    setCurrentCustomer({});
    toggleModal();
  };

  const toggleSuccessModal = () => {
    setSuccessModal(!successModal);
  };

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    onRefresh();
  };

  const handleDeleteCustomer = async () => {
    try {
      await deleteCustomerById(currentCustomer.id);
      toggleModal();

      toggleSuccessModal();
    } catch (errors) {
      setError(error.message);
    }
  };

  const handleGetCustomer = async (id) => {
    try {
      const customerById = await getCustomerById(id);
      setCurrentCustomer(customerById);
      toggleModal();
    } catch (errors) {
      setError(errors.message);
    }
  };

  return (
    <>
      <div className='delete-container'>
        <DeleteIcon className='delete-icon' fontSize='small' onClick={() => handleGetCustomer(customer.id)} />
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
      {successModal && <DeletionSuccessModal domain='Customer' onClose={handleCloseSuccessModal} />}
    </>
  );
}
