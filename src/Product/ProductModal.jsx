/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
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
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const toggleModal = () => {
    setModal(!modal);
  };

  const isFormValid = (formValues) => {
    const error = {};
    if (formValues.description.length > 100) {
      error.description = 'Description must be 100 characters or less.';
    }
    if (formValues.name.length > 50) {
      error.name = 'Name must be 50 characters or less.';
    }
    if (formValues.classification === 'Baked Good' && formValues.vendorId.length < 1) {
      error.vendorId = 'Must include Vendor Id for Baked Good Products.';
    }
    if (formValues.ingredientsList.length < 1) {
      error.ingredientsList = 'Ingredients List is empty.';
    }
    if (formValues.classification === '') {
      error.classification = 'Classification must be Drink or Baked Good.';
    }
    if (formValues.classification === 'Drink' && formValues.type === '') {
      error.type = 'Must choose a Drink Type.';
    }
    const wholeNumberPattern = /^\d+$/;
    if (
      formValues.classification === 'Baked Good' &&
      (formValues.markup === '' || !wholeNumberPattern.test(formValues.markup))
    ) {
      error.markup = 'Markup must be a whole number.';
    }
    const costPattern = /^\d\.\d{2}$/;
    if (!costPattern.test(formValues.cost)) {
      error.cost = 'Must be numbers in the following format: X.XX';
    }
    setErrors(error);
    const errorCheck = Object.keys(error).length === 0;
    return errorCheck;
  };

  const handleSubmit = async (formValues) => {
    if (isFormValid(formValues)) {
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
            <ProductForm fields={fields} ref={formRef} type={type} onSubmit={handleSubmit} errors={errors} />
            <div className='btn-container'>
              <button type='button' className='close-modal' onClick={toggleModal}>
                Cancel
              </button>
              <button
                type='submit'
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
