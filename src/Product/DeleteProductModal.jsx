/* eslint-disable no-alert */
import { React, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { getProductById, deleteProduct } from '../apiService';

export default function DeleteProductModal({ product, onDeleteSuccess }) {
  const [modal, setModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  const toggleModal = () => {
    if (modal) {
      setError(null);
    }
    setModal(!modal);
  };

  const handleGetProduct = async (id) => {
    const productToDelete = await getProductById(id);
    setCurrentProduct(productToDelete);
    toggleModal();
  };

  const handleCancel = () => {
    setCurrentProduct({});
    toggleModal();
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(currentProduct);
      toggleModal();
      onDeleteSuccess();
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
