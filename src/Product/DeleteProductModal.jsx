/* eslint-disable no-alert */
import { React, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { getProductById, deleteProduct } from '../apiService';

// This component renders a modal for deleting a product
export default function DeleteProductModal({ product, onRefresh, toggleSuccessModal }) {
  const [modal, setModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [error, setError] = useState(null);

  // Function to toggle the modal's visibility
  const toggleModal = () => {
    if (modal) {
      setError(null);
    }
    setModal(!modal);
  };

  // Function to fetch the product details by its id and show the modal
  const handleGetProduct = async (id) => {
    const productToDelete = await getProductById(id);
    setCurrentProduct(productToDelete);
    toggleModal();
  };

  // Function to handle the cancel action and close the modal
  const handleCancel = () => {
    setCurrentProduct({});
    toggleModal();
  };

  // Function to handle the product deletion
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(currentProduct);
      toggleModal();
      onRefresh();
      toggleSuccessModal();
    } catch (errors) {
      alert('Error deleting product:', error);
    }
  };

  return (
    <>
      <div className='delete-container'>
        <IconButton className='delete-icon' fontSize='small' onClick={() => handleGetProduct(product.id)}>
          <DeleteIcon />
        </IconButton>
      </div>
      {modal && (
        <div className='modal'>
          <div className='overlay' />
          <div className='delete-modal-content'>
            <div className='delete-modal-header'>
              <h2>Are you sure you want to delete this product? </h2>
            </div>
            <div className='delete-btn-container'>
              <button type='button' className='close-modal' onClick={handleCancel}>
                Cancel
              </button>
              <button type='button' className='delete-submit-close-modal' onClick={handleDeleteProduct}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
