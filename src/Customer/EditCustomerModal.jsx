/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable function-paren-newline */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import '../Component/Modal.css';
import { editCustomer, getCustomerById } from '../apiService';
import CustomerForm from './CustomerForm';

// Array of fields for New Customer Modal.
const fields = [
  {
    id: 'active',
    label: 'Active',
    keys: 'active',
    type: 'checkbox'
  },
  { id: 'name', label: 'Name', keys: 'name' },
  { id: 'emailAddress', label: 'Email', keys: 'emailAddress' },
  { id: 'lifetimeSpent', label: 'Lifetime Spent', keys: 'lifetimeSpent' }
];
export default function EditCustomerModal({ customer, onRefresh }) {
  const [modal, setModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({
    id: '',
    active: false,
    name: '',
    emailAddress: '',
    lifetimeSpent: ''
  });

  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    nameError: '',
    emailError: '',
    lifetimeSpentError: ''
  });

  // Validates that provided email address is in x@x.x format.
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validates that text fields to ensure they have value and are in the right format.
  const isFormValid = (customerToValidate) => {
    const errors = {
      nameError: 'Name must be 50 characters or less.',
      emailError: 'Must be a valid email.',
      lifetimeSpentError: 'Must be a valid amount, greater than 0.'
    };

    if (!customerToValidate.name || customerToValidate.name.length >= 50) {
      errors.nameError = 'Name must be 50 characters or less.';
    } else {
      errors.nameError = '';
    }

    if (!validateEmail(customerToValidate.emailAddress)) {
      errors.emailError = 'Email must be in x@x.x format.';
    } else {
      errors.emailError = '';
    }

    const amountPattern = /^\d{0,4}\.\d{2}$/;
    if (!amountPattern.test(customerToValidate.lifetimeSpent)) {
      errors.lifetimeSpentError = 'Must be numbers in the following format: X.XX';
    } else {
      errors.lifetimeSpentError = '';
    }

    if (customerToValidate.lifetimeSpent < 0.0) {
      errors.lifetimeSpentError = 'Lifetime Spent must be a non-negative value.';
    } else {
      errors.lifetimeSpentError = '';
    }

    setValidationErrors({
      nameError: errors.nameError,
      emailError: errors.emailError,
      lifetimeSpentError: errors.lifetimeSpentError
    }); // sets validation errors for text fields

    return errors;
  };

  // Toggles Modal visibility
  const toggleModal = () => {
    if (modal) {
      setError(null); // Reset error when closing the modal
    }
    setModal(!modal); // Toggle modal visibility
  };
  // Handles changes to Customer according to values from Modal
  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    setCurrentCustomer((prevValues) => ({
      ...prevValues,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  // Edit a customer and performs a put request with updated customer.
  const handleSubmit = async () => {
    const errors = isFormValid(currentCustomer);
    if (errors.emailError.length !== 0 || errors.nameError.length !== 0 || errors.lifetimeSpentError.length !== 0) {
      return;
    }
    try {
      const customerToEdit = {
        id: currentCustomer.id,
        active: currentCustomer.active,
        name: currentCustomer.name,
        emailAddress: currentCustomer.emailAddress,
        lifetimeSpent: currentCustomer.lifetimeSpent
      };
      await editCustomer(customerToEdit);
      setError(null); // Reset error on success
      toggleModal(); // Disable modal on success
      onRefresh(); // Refresh customer list on success

      // Reset Customer to default values
      setCurrentCustomer({
        id: '',
        active: false,
        name: '',
        emailAddress: '',
        lifetimeSpent: ''
      });
    } catch (err) {
      setError(err.response ? err.response.data : err.message); // Set error message on fail
    }
  };
  const handleEditCustomer = async (id) => {
    try {
      const customerById = await getCustomerById(id);

      const experimentCustomer = {
        id: customerById.id,
        active: customerById.active,
        name: customerById.name,
        emailAddress: customerById.emailAddress,
        lifetimeSpent: customerById.lifetimeSpent,
        customerSince: customerById.customerSince
      };
      setCurrentCustomer(experimentCustomer);

      toggleModal();
    } catch (err) {
      setError(err.message);
    }
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      <div className='edit-container'>
        <EditIcon className='edit-icon' fontSize='small' onClick={() => handleEditCustomer(customer.id)} />
        <div className='id-number'>{customer.id}</div>
      </div>
      {modal && (
        <div className='modal'>
          <div className='overlay' onClick={toggleModal} />
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>EDIT CUSTOMER FORM</h2>
            </div>

            <CustomerForm
              fields={fields}
              customer={currentCustomer}
              onChange={handleChange}
              error={error}
              validationErrors={validationErrors}
            />
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            <div className='btn-container'>
              <button type='button' className='close-modal' onClick={toggleModal}>
                Cancel
              </button>
              <button type='submit' className='submit-close-modal' onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
