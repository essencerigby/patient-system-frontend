import React, { useState } from 'react';
import '../Component/Modal.css';
import { createReservation } from '../apiService';
import ReservationForm from './ReservationForm';

const fields = [
  {
    id: 'guestEmail',
    label: 'Email',
    keys: 'guestEmail',
    required: true
  },
  {
    id: 'checkInDate',
    label: 'Check-in Date',
    keys: 'checkInDate',
    required: true
  },
  {
    id: 'numberOfNights',
    label: 'Number of Nights',
    keys: 'numberOfNights',
    required: true
  }
];

export default function UpdateReservationModal({ onRefresh }) {
  const [modal, setModal] = useState(false);
  const [reservations, setReservations] = useState({
    guestEmail: '',
    checkInDate: '',
    numberOfNights: ''
  });
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    guestEmailError: '',
    checkInDateError: '',
    numberOfNightsError: ''
  });
  /**
 * Toggles modal visibility
 */
  const toggleModal = () => {
    if (modal) {
      setError(null);
    }
    setModal(!modal);
  };

  /**
   * Validates that provided email address is in x@x.x format.
   * @returns {boolean} indicates whether or not a pattern exists in a searched string.
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validates that Number of Nights is only 2 digits  max, and greater than 0.
   * @returns {boolean} indicates whether or not a pattern exists in a searched string.
   */
  const validateNumberOfNights = (numOfNights) => {
    const numOfNightsRegex = /^[1-9][0-9]?$|^10$/;
    return numOfNightsRegex.test(numOfNights);
  };

  /**
   * Validates that Number of Nights is only 2 digits  max, and greater than 0.
   * @returns {boolean} indicates whether or not a pattern exists in a searched string.
   */
  const validateCheckInDate = (checkinDate) => {
    const checkInDateRegex = /^(0[1-9]|1[0-2])-([0-2][0-9]|3[01])-(\d{4})$/;
    return checkInDateRegex.test(checkinDate);
  };

  /**
   *  Validates the text fields to ensure they have value and are in the right format.
   *  @returns errors if there is any
  */
  const isFormValid = (reservationToValidate) => {
    const errors = {
      numberOfNightsError: 'Must be a number greater than 0.',
      guestEmailError: 'Must be a valid email.',
      checkInDateError: 'Must be a valid date.'
    };

    if (!validateNumberOfNights(reservationToValidate.numberOfNights)) {
      errors.numberOfNightsError = 'Number of nights must be between 1-99.';
    } else {
      errors.numberOfNightsError = '';
    }

    if (!validateEmail(reservationToValidate.guestEmail)) {
      errors.guestEmailError = 'Email must be in x@x.x format.';
    } else {
      errors.guestEmailError = '';
    }

    if (!validateCheckInDate(reservationToValidate.checkInDate)) {
      errors.checkInDateError = 'Check-in Date must be in mm-dd-yyyy';
    } else {
      errors.checkInDateError = '';
    }

    setValidationErrors({
      guestEmailError: errors.guestEmailError,
      checkInDateError: errors.checkInDate,
      numberOfNightsError: errors.numberOfNightsError
    });

    return errors;
  };

  /**
   * Handles changes to reservation according to values from Modal
   */
  const handleChange = (e) => {
    const {
      id,
      type,
      checked,
      value
    } = e.target;
    setReservations((prevValues) => ({
      ...prevValues,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  /**
   * Creates a new reservation and performs a post request with new reservation.
   * Errors are reset, modal is disabled,
   reservation table is reset to show new reservation on success
   * On success modal fields are reset.
   */
  const handleSubmit = async () => {
    const errors = isFormValid(reservations);
    if (
      errors.guestEmailError.length !== 0
      || errors.checkInDateError.length !== 0
      || errors.numberOfNightsError.length !== 0
    ) {
      return;
    }
    try {
      const reservation = {
        guestEmail: reservations.guestEmail,
        checkInDate: reservations.checkInDate,
        numberOfNights: reservations.numberOfNights
      };
      await createReservation(reservation);
      setError(null);
      toggleModal();
      onRefresh();

      setReservations({
        checkInDate: '',
        numberOfNights: '',
        guestEmail: ''
      });
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    }
  };

  /**
   * When initiated reservation data isreset to default values.
   Modal is disabled and errors are reset to initial values
   */
  const handleCancel = () => {
    setReservations({});
    toggleModal();
    setError(null);
    setValidationErrors({
      numberOfNightsError: '',
      guestEmailError: '',
      checkInDateError: ''
    });
  };

  /**
   * When initiated modal is visibility is enabled/disabled
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Esc') {
      toggleModal();
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
        <strong>Create</strong>
      </button>
      {modal && (
        <div className='modal'>
          <div className='overlay' aria-label='overlay' role='button' onClick={toggleModal} onKeyDown={handleKeyDown} tabIndex={0} />
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>NEW RESERVATION FORM</h2>
            </div>
            <ReservationForm
              fields={fields}
              reservation={reservations}
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
