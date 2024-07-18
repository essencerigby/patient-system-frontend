import React, { useState } from 'react';
import '../Component/Modal.css';
import { createPatient, getPatients } from '../apiService';
import ValidatePatient from './ValidatePatient';
import PatientForm from './PatientForm';

// Array of fields for the form
const fields = [
  {
    id: 'firstName', label: 'First Name', keys: 'firstName', required: true
  },
  {
    id: 'lastName', label: 'Last Name', keys: 'lastName', required: true
  },
  {
    id: 'ssn', label: 'SSN', keys: 'ssn', required: true
  },
  {
    id: 'email', label: 'Email', keys: 'email', required: true
  },
  {
    id: 'street', label: 'Street Address', keys: 'street', required: true
  },
  {
    id: 'city', label: 'City', keys: 'city', required: true
  },
  {
    id: 'state', label: 'State', keys: 'state', required: true
  },
  {
    id: 'zip', label: 'Zip', keys: 'zip', required: true
  },
  {
    id: 'age', label: 'Age', keys: 'age', required: true
  },
  {
    id: 'height', label: 'Height (in.)', keys: 'height', required: false
  },
  {
    id: 'weight', label: 'Weight (lbs.)', keys: 'weight', required: false
  },
  {
    id: 'gender', label: 'Gender', keys: 'gender', required: true
  },
  {
    id: 'insurance', label: 'Insurance', keys: 'insurance', required: true
  }
];

export default function CreatePatient({ onRefresh }) {
  const [modal, setModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [patient, setPatient] = useState({
    id: '',
    firstName: '',
    lastName: '',
    ssn: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    insurance: ''
  });
  const [patients, setPatients] = useState([]);

  const toggleModal = async () => {
    if (!modal) {
      const fetchedPatients = await getPatients();
      setPatients(fetchedPatients);
    }
    setModal(!modal);
    if (modal) {
      setErrors({});
    } // Toggle modal visibility
  };

  const isUnique = () => {
    const uniqueErrors = {};
    const ssnExists = patients.some((p) => p.ssn === patient.ssn);
    const emailExists = patients.some((p) => p.email === patient.email);

    if (ssnExists) uniqueErrors.ssn = 'SSN already in use';
    if (emailExists) uniqueErrors.email = 'Email already in use';

    return uniqueErrors;
  };

  // This function handles changes in input fields of the vendor form.
  const handleChange = (e) => {
    const { id, value } = e.target;
    setPatient((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  // This function handles the submission of the vendor form. Checks that all inputs are valid.
  const handleSubmit = async () => {
    const validationErrors = ValidatePatient(patient);
    const uniquenessErrors = isUnique();
    const combinedErrors = { ...validationErrors, ...uniquenessErrors };
    setErrors(combinedErrors);
    if (Object.keys(combinedErrors).length > 0) return;
    try {
      const patientToCreate = {
        id: patient.id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        ssn: patient.ssn,
        email: patient.email,
        street: patient.street,
        city: patient.city,
        state: patient.state,
        zip: patient.zip,
        age: patient.age,
        height: patient.height,
        weight: patient.weight,
        gender: patient.gender,
        insurance: patient.insurance
      };
      await createPatient(patientToCreate);
      setErrors({}); // Reset error on successful submission
      toggleModal(); // Close the modal after successful submission
      onRefresh(); // Refresh the vendor list after successful submission
      setPatient({
        id: '',
        firstName: '',
        lastName: '',
        ssn: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        age: '',
        height: '',
        weight: '',
        gender: '',
        insurance: ''
      }); // Resetting the vendor state to its initial empty values after successful submission
    } catch (err) {
      setErrors({
        form: err.response ? err.response.data : err.message
      }); // Set error if submission fails
    }
  };

  // When initiated, modal closes.
  const handleCancel = () => {
    setPatient({});
    setErrors({});
    toggleModal(); // Toggle modal visibility
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      <button type='button' onClick={toggleModal} className='btn-modal'>
        <strong>Create Patient</strong>
      </button>
      {modal && (
        <div className='modal'>
          <div className='overlay' />
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>NEW PATIENT FORM</h2>
            </div>
            <PatientForm
              fields={fields}
              patient={patient}
              onChange={handleChange}
              errors={errors}
            />
            {errors.form && <div className='error-message'>{errors.form}</div>}

            <div className='btn-container'>
              <button type='button' className='close-modal' onClick={handleCancel}>
                Cancel
              </button>
              <button type='button' className='submit-close-modal' onClick={handleSubmit}>
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
