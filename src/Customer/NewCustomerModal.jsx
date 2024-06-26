/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';
import '../Component/Modal.css';
import { createCustomer } from '../apiService';
import CustomerForm from './CustomerForm';

// Array of fields for New Customer Modal.
const fields = [
  {
    id: 'active', label: 'Active', keys: 'active', type: 'checkbox'
  },
  { id: 'name', label: 'Name', keys: 'name' },
  { id: 'emailAddress', label: 'Email', keys: 'emailAddress' }
];

export default function CustomerModal({ onRefresh }) {
  const [modal, setModal] = useState(false);
  const [customer, setCustomer] = useState({
    active: false,
    name: '',
    emailAddress: ''
  });
  const [error, setError] = useState();
  const [validationErrors, setValidationErrors] = useState({
    nameError: '',
    emailError: ''
  });

  // Toggles Modal visibility
  const toggleModal = () => {
    if (modal) {
      setError(null); // Reset error when closing the modal
    }
    setModal(!modal); // Toggle modal visibility
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // "input-flex-error" class used to change input border style
  // "error-message" class used for error message text
  const isFormValid = (customerToValidate) => {
    const errors = {
      nameError: '',
      emailError: ''
    };

    if (!customerToValidate.name || customerToValidate.name.length >= 50) {
      errors.nameError = 'Name must be 50 characters or less.';
    }

    if (!validateEmail(customerToValidate.emailAddress)) {
      errors.emailError = 'Must be a valid email.';
    }

    setValidationErrors({
      nameError: errors.nameError,
      emailError: errors.emailError
    });

    console.log(validationErrors);
  };

  // Handles changes to Customer according to values from Modal
  const handleChange = (e) => {
    const {
      id, type, checked, value
    } = e.target;
    setCustomer((prevValues) => ({
      ...prevValues,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  // Creates a new customer and performs a post request with new customer.
  const handleSubmit = async () => {
    try {
      const customerToCreate = {
        active: customer.active,
        name: customer.name,
        emailAddress: customer.emailAddress,
        lifetimeSpent: 0
      };

      isFormValid(customerToCreate);

      await createCustomer(customerToCreate);
      setError(null); // Reset error on success
      toggleModal(); // Disable modal on success
      onRefresh(); // Refresh customer list on success

      // Reset Customer to default values
      setCustomer({
        active: false,
        name: '',
        emailAddress: ''
      });
    } catch (err) {
      setError(err.response ? err.response.data : err.message); // Set error message on fail
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
        <strong>Add New Customer +</strong>
      </button>
      {modal && (
        <div className='modal'>
          <div className='overlay' onClick={toggleModal} />
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>NEW CUSTOMER FORM</h2>
            </div>
            <CustomerForm
              fields={fields}
              customer={customer}
              onChange={handleChange}
              error={error}
              
            />
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            <div className='btn-container'>
              <button type='button' className='close-modal' onClick={toggleModal}>
                Cancel
              </button>
              <button
                type='submit'
                className='submit-close-modal'
                onClick={handleSubmit}
              >
                Submit
              </button>

              {/* Delete this later */}
              <button type='button' onClick={() => { isFormValid(customer); }}>
                ValidateForm
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
