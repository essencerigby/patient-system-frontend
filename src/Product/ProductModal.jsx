/* eslint-disable no-alert */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState, useRef } from 'react';
import '../Component/Modal.css';
import axios from 'axios';
import ProductForm from './NewProductForm';

export default function ProductModal({ fields, type, onRefresh }) {
  const [modal, setModal] = useState(false);
  const formRef = useRef(null);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = async (formValues) => {
    try {
      const productToCreate = {
        ...formValues,
        salePrice: formValues.salePrice // Calculate salePrice as needed
      };
      await axios.post('http://localhost:8085/products', productToCreate);
      toggleModal(); // Close modal after successful submission
      onRefresh();
    } catch (error) {
      alert('Error making POST request:', error);
    }
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      <button type='button' onClick={toggleModal} className='btn-modal'>
        <strong>Add New Product +</strong>
      </button>

      {modal && (
        <div className='modal'>
          <div className='overlay' onClick={toggleModal} />
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>NEW PRODUCT FORM</h2>
            </div>
            <ProductForm fields={fields} ref={formRef} type={type} onSubmit={handleSubmit} />
            <div className='btn-container'>
              <button type='button' className='close-modal' onClick={toggleModal}>
                Cancel
              </button>
              <button
                type='submit'
                onClick={() => formRef
                  .current
                  .dispatchEvent(new Event(
                    'submit',
                    { cancelable: true, bubbles: true }
                  ))}
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
