/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable function-paren-newline */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import '../Component/Modal.css';
import { updateReservation, getById } from '../apiService';
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
export default function UpdateReservationModal({ customer, onRefresh }) {
  const [modal, setModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({
    id: '',
    checkInDate: '',
    emailAddress: '',
    numberOfNights: '0'
  });

  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    checkInDateError: '',
    emailError: '',
    numberOfNightsError: ''
  });

  // Validates that provided email address is in x@x.x format.
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validates that text fields to ensure they have value and are in the right format.
  const isFormValid = (reservationToValidate) => {
    const errors = {
      checkInDateError: 'Must be a valid date.',
      emailError: 'Must be a valid email.',
      numberOfNightsError: 'Must be a valid number, greater than 0.'
    };

    if (!validateEmail(reservationToValidate.emailAddress)) {
      errors.emailError = 'Email must be in x@x.x format.';
    } else {
      errors.emailError = '';
    }

    const datePattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/;
    if (!datePattern.test(reservationToValidate.checkInDate)) {
      errors.checkInDateError = 'Date must be in the following format: mm/dd/yyyy';
    } else {
      errors.checkInDateError = '';
    }

    if (reservationToValidate.numberOfNights < 0) {
      errors.numberOfNightsError = 'Number of Nights must be a non-negative value greater than 0.';
    } else {
      errors.numberOfNightsError = '';
    }

    setValidationErrors({
      checkInDateError: errors.checkInDateError,
      emailError: errors.emailError,
      numberOfNightsError: errors.numberOfNightsError
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
    if (errors.emailError.length !== 0 || errors.checkInDateError.length !== 0 || errors.numberOfNightsError.length !== 0) {
      return;
    }
    try {
      const reservationToEdit = {
        id: currentCustomer.id,
        emailAddress: currentCustomer.emailAddress,
        checkInDate: currentCustomer.checkInDate,
        numberOfNights: currentCustomer.numberOfNights === '' ? '0' : currentCustomer.numberOfNights
      };
      await updateReservation(reservationToEdit);
      setError(null);
      toggleModal();
      onRefresh();

      // Reset Customer to default values
      setCurrentCustomer({
        id: '',
        checkInDateError: '',
        emailError: '',
        numberOfNightsError: '0'
      });
    } catch (err) {
      setError(err.response ? err.response.data : err.message); // Set error message on fail
    }
  };
  const handleEditCustomer = async (id) => {
    try {
      const reservationById = await getById(id);
      const experimentReservation = {
        id: reservationById.id,
        emailAddress: reservationById.emailAddress,
        checkInDate: reservationById.checkInDate,
        numberOfNights: reservationById.numberOfNights
      };
      setCurrentCustomer(experimentReservation);

      toggleModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setCurrentCustomer({}); // Reset Customer to default values
    toggleModal(); // Toggle modal visibility
    setError(null); // Resets errors to initial values
    setValidationErrors({
      emailError: '',
      checkInDateError: '',
      numberOfNightsError: ''
    });
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
              <h2>UPDATE RESERVATION FORM</h2>
            </div>

            <ReservationForm
              fields={fields}
              customer={currentCustomer}
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
