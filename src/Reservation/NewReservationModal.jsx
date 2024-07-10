/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable object-curly-newline */

import React, { useState } from 'react';
import '../Component/Modal.css';
import { createReservation } from '../apiService';
import ReservationForm from './ReservationForm';

// Array of fields for New Reservation Modal.
const fields = [
  { id: 'emailAddress', label: 'Email', keys: 'emailAddress', required: true },
  {
    id: 'checkInDate',
    label: 'Check-in Date',
    keys: 'checkInDate',
    type: 'date'
  },
  { id: 'numberOfNights', label: 'Number of Nights', keys: 'numberOfNights' }
];

export default function ReservationModal({ onRefresh }) {
  const [modal, setModal] = useState(false);
  const [customer, setCustomer] = useState({
    checkInDate: '',
    numberOfNights: '',
    emailAddress: ''
  });
  const [error, setError] = useState();
  const [validationErrors, setValidationErrors] = useState({
    checkInDatError: '',
    emailError: '',
    numberOfNightsError: ''
  });

  // Toggles Modal visibility
  const toggleModal = () => {
    if (modal) {
      setError(null); // Reset error when closing the modal
    }
    setModal(!modal); // Toggle modal visibility
  };

  // Validates that provided email address is in x@x.x format.
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validates that text fields to ensure they have value and are in the right format.
  const isFormValid = (reservationToValidate) => {
    const errors = {
      numberOfNightsError: 'Must be a number greater than 0.',
      emailError: 'Must be a valid email.',
      checkInDateError: 'Must be a valid date.'
    };

    if (!reservationToValidate.name || reservationToValidate.name.length >= 50) {
      errors.nameError = 'Name must be 50 characters or less.';
    } else {
      errors.nameError = '';
    }

    if (!validateEmail(reservationToValidate.emailAddress)) {
      errors.emailError = 'Email must be in x@x.x format.';
    } else {
      errors.emailError = '';
    }

    setValidationErrors({
      nameError: errors.nameError,
      emailError: errors.emailError
    }); // sets validation errors for text fields

    return errors;
  };

  // Handles changes to Customer according to values from Modal
  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    setCustomer((prevValues) => ({
      ...prevValues,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  // Creates a new customer and performs a post request with new customer.
  const handleSubmit = async () => {
    const errors = isFormValid(customer);
    if (errors.emailError.length !== 0 || errors.nameError.length !== 0) {
      return;
    }
    try {
      const reservationToCreate = {
        active: customer.active,
        name: customer.name,
        emailAddress: customer.emailAddress,
        lifetimeSpent: 0
      };
      await createReservation(reservationToCreate);
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

  const handleCancel = () => {
    setCustomer({}); // Reset Customer to default values
    toggleModal(); // Toggle modal visibility
    setError(null); // Resets errors to initial values
    setValidationErrors({
      nameError: '',
      emailError: ''
    });
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      <button type='button' onClick={toggleModal} className='btn-modal'>
        <strong>Create</strong>
      </button>
      {modal && (
        <div className='modal'>
          <div className='overlay' onClick={toggleModal} />
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>NEW RESERVATION FORM</h2>
            </div>
            <ReservationForm
              fields={fields}
              customer={customer}
              onChange={handleChange}
              error={error}
              validationErrors={validationErrors}
            />
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            <div className='btn-container'>
              <button type='button' className='close-modal' onClick={handleCancel}>
                Cancel
              </button>
              <button type='submit' className='submit-close-modal' onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <div style={{ color: 'red', marginLeft: '10px', textAlign: 'left' }}>* required fields</div>
          </div>
        </div>
      )}
    </>
  );
}
