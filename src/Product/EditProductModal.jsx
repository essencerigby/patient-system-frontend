/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import '../Component/Modal.css';
import ProductForm from './NewProductForm';
import { editProduct, getProductById } from '../apiService';

// eslint-disable-next-line object-curly-newline
export default function EditProductModal({ fields, type, product, onRefresh }) {
  const [modal, setModal] = useState(false);
  const formRef = useRef(null);
  const [currentProduct, setCurrentProduct] = useState({});

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = async (formValues) => {
    try {
      const productToEdit = {
        ...formValues,
        salePrice: formValues.salePrice
      };
      await editProduct(productToEdit);
      toggleModal();
      onRefresh();
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Error updating product:', error);
    }
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const handleEditProduct = async (id) => {
    const productById = await getProductById(id);
    setCurrentProduct(productById);
    toggleModal();
  };

  return (
    <>
      <div className='edit-container'>
        <EditIcon className='edit-icon' fontSize='small' onClick={() => handleEditProduct(product.id)} />
        <div className='id-number'>{product.id}</div>
      </div>

      {modal && (
        <div className='modal'>
          <div className='overlay' onClick={toggleModal} />
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>EDIT PRODUCT FORM</h2>
            </div>
            {/* eslint-disable-next-line max-len */}
            <ProductForm fields={fields} ref={formRef} type={type} product={currentProduct} onSubmit={handleSubmit} />
            <div className='btn-container'>
              <button type='button' className='close-modal' onClick={toggleModal}>
                Cancel
              </button>
              <button
                type='submit'
                className='submit-close-modal'
                onClick={() => formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
