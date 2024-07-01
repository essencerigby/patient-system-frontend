/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-alert */
import { React, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

// This component renders a modal for deleting a product
export default function DeleteProductModal({ id, domain, getObjectById, deleteObject, onRefresh, toggleSuccessModal }) {
  const [modal, setModal] = useState(false);
  const [currentObject, setCurrentObject] = useState({});
  const [error, setError] = useState(null);

  // Function to toggle the modal's visibility
  const toggleModal = () => {
    if (modal) {
      setError(null);
    }
    setModal(!modal);
  };

  // Function to fetch the product details by its id and show the modal
  const handleGetObject = async () => {
    const objectToDelete = await getObjectById(id);
    setCurrentObject(objectToDelete);
    toggleModal();
  };

  // Function to handle the cancel action and close the modal
  const handleCancel = () => {
    setCurrentObject({});
    toggleModal();
  };

  // Function to handle the product deletion
  const handleDeleteObject = async () => {
    try {
      await deleteObject(currentObject);
      toggleModal();
      onRefresh();
      toggleSuccessModal();
    } catch (errors) {
      alert(`Error deleting ${domain.toLowerCase()}:`, error);
    }
  };

  return (
    <>
      <div className='delete-container'>
        <IconButton className='delete-icon' fontSize='small' onClick={() => handleGetObject(id)}>
          <DeleteIcon />
        </IconButton>
      </div>
      {modal && (
        <div className='modal'>
          <div className='overlay' />
          <div className='delete-modal-content'>
            <div className='delete-modal-header'>
              <h2>Are you sure you want to delete this {domain.toLowerCase()}? </h2>
            </div>
            <div className='delete-btn-container'>
              <button type='button' className='close-modal' onClick={handleCancel}>
                Cancel
              </button>
              <button type='button' className='delete-submit-close-modal' onClick={handleDeleteObject}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
