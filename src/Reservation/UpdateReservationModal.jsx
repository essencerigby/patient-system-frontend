import React, { useState } from 'react';
import '../Component/Modal.css';
import { updateReservation, getReservationById } from '../apiService';
import ReservationForm from './ReservationForm';

/**
 * Array of fields for NewReservationModal.
 */
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

export default function UpdateReservationModal({ reservation, onRefresh }) {
  const [modal, setModal] = useState(false);
  const [currentReservation, setCurrentReservation] = useState({
    id: '',
    guestEmail: '',
    checkInDate: '',
    numberOfNights: ''
  });

  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    checkInDateError: '',
    guestEmailError: '',
    numberOfNightsError: ''
  });

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
      checkInDateError: 'Must be a valid date.',
      guestEmailError: 'Must be a valid email.',
      numberOfNightsError: 'Must be a valid number greater than 0.'
    };

    if (!validateEmail(reservationToValidate.guestEmail)) {
      errors.guestEmailError = 'Email must be in x@x.x format.';
    } else {
      errors.guestEmailError = '';
    }

    if (!validateCheckInDate(reservationToValidate.checkInDate)) {
      errors.checkInDateError = 'Check-in date must be in mm-dd-yyyy';
    } else {
      errors.checkInDateError = '';
    }

    if (!validateNumberOfNights(reservationToValidate.numberOfNights)) {
      errors.numberOfNightsError = 'Number of nights must be between 1-99.';
    } else {
      errors.numberOfNightsError = '';
    }

    setValidationErrors({
      guestEmailError: errors.guestEmailError,
      checkInDateError: errors.checkInDateError,
      numberOfNightsError: errors.numberOfNightsError
    });

    return errors;
  };

  /**
 * Toggles modal visibility
 */
  const toggleModal = () => {
    if (modal) {
      setError(null); // Reset error when closing the modal
    }
    setModal(!modal); // Toggle modal visibility
  };

  /**
   * Handles changes to reservation according to values from Modal
   */
  const handleChange = (e) => {
    const {
      id, type, checked, value
    } = e.target;
    setCurrentReservation((prevValues) => ({
      ...prevValues,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  /**
   * Edit a Reservation and performs a put request with updated Reservation.
   * Errors are reset, modal is disabled,
   reservation table is reset to show new reservation on success
   * On success modal fields are reset.
   */
  const handleSubmit = async () => {
    const errors = isFormValid(currentReservation);
    if (
      errors.guestEmailError.length !== 0
      || errors.checkInDateError.length !== 0
      || errors.numberOfNightsError.length !== 0
    ) {
      return;
    }
    try {
      const reservationToEdit = {
        id: currentReservation.id,
        guestEmail: currentReservation.guestEmail,
        checkInDate: currentReservation.checkInDate,
        numberOfNights: currentReservation.numberOfNights === '' ? '0' : currentReservation.numberOfNights
      };
      await updateReservation(reservationToEdit);
      setError(null);
      toggleModal();
      onRefresh();

      setCurrentReservation({
        id: '',
        checkInDateError: '',
        guestEmailError: '',
        numberOfNightsError: ''
      });
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    }
  };

  /**
   * When initiated fields are propopulated with the data respective to the id
   */
  const handleEditReservation = async (id) => {
    try {
      const reservationById = await getReservationById(id);
      const experimentReservation = {
        id: reservationById.id,
        guestEmail: reservationById.guestEmail,
        checkInDate: reservationById.checkInDate,
        numberOfNights: reservationById.numberOfNights
      };
      setCurrentReservation(experimentReservation);

      toggleModal();
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * When initiated reservation data is reset to default values.
   Modal is disabled and errors are reset to initial values
   */
  const handleCancel = () => {
    setCurrentReservation({});
    toggleModal();
    setError(null);
    setValidationErrors({
      guestEmailError: '',
      checkInDateError: '',
      numberOfNightsError: ''
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
      <div className='edit-container'>
        <button
          className='edit-icon'
          type='button'
          fontSize='small'
          onClick={() => handleEditReservation(reservation.id)}
        >
          Edit
        </button>
        <div className='id-number'>{reservation.id}</div>
      </div>
      {modal && (
        <div className='modal'>
          <div
            className='overlay'
            aria-label='overlay'
            role='button'
            onClick={toggleModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          />
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>UPDATE RESERVATION FORM</h2>
            </div>

            <ReservationForm
              fields={fields}
              reservation={currentReservation}
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
