/* eslint-disable no-alert */
import { React, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { getProductById, deleteProduct } from '../apiService';

export default function DeleteProductModal({ product, onRefresh }) {
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

  const handleDeleteProduct = async (id) => {
    const productToDelete = await getProductById(id);
    setCurrentProduct(productToDelete);
    toggleModal();
  };

  const handleCancel = () => {
    setCurrentProduct({});
    toggleModal();
  };

  const handleSubmit = async () => {
    try {
      await deleteProduct(currentProduct);
      toggleModal();
      onRefresh();
    } catch (errors) {
      alert('Error deleting product:', error);
    }
  };

  return (
    <>
      <div className='delete-container'>
        <IconButton className='delete-icon' fontSize='small' onClick={() => handleDeleteProduct(product.id)}>
          <DeleteIcon />
        </IconButton>
      </div>
      {modal && (
        <div className='modal'>
          <div className='overlay' />
          <div className='modal-content'>
            <div className='delete-modal-header'>
              <h1>{product.name} </h1>
            </div>
            <h3>Are you sure you want to delete this product?</h3>
            <div className='btn-container'>
              <button type='button' className='close-modal' onClick={handleCancel}>
                Cancel
              </button>
              <button type='button' className='submit-close-modal' onClick={handleSubmit}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
