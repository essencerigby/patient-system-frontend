import EditIcon from '@mui/icons-material/Edit';
import React, { useState, useEffect } from 'react';
import '../Component/Modal.css';
import { updatePatient, getPatientById } from '../apiService';
import PatientForm from './PatientForm';
import ValidatePatient from './ValidatePatient';

const fields = [
  {
    id: 'firstName',
    label: 'First Name',
    keys: 'firstName',
    required: true
  },
  {
    id: 'lastName',
    label: 'Last Name',
    keys: 'lastName',
    required: true
  },
  {
    id: 'ssn',
    label: 'SSN',
    keys: 'ssn',
    required: true
  },
  {
    id: 'email',
    label: 'Email',
    keys: 'email',
    required: true
  },
  {
    id: 'street',
    label: 'Street Address',
    keys: 'street',
    required: true
  },
  {
    id: 'city',
    label: 'City',
    keys: 'city',
    required: true
  },
  {
    id: 'state',
    label: 'State',
    keys: 'state',
    required: true
  },
  {
    id: 'zip',
    label: 'Zip',
    keys: 'zip',
    required: true
  },
  {
    id: 'age',
    label: 'Age',
    keys: 'age',
    required: true
  },
  {
    id: 'height',
    label: 'Height',
    keys: 'height',
    required: false
  },
  {
    id: 'weight',
    label: 'Weight',
    keys: 'weight',
    required: false
  },
  {
    id: 'gender',
    label: 'Gender',
    keys: 'gender',
    required: true
  },
  {
    id: 'insurance',
    label: 'Insurance',
    keys: 'insurance',
    required: true
  }
];

export default function UpdatePatient({ patient, onRefresh }) {
  const [modal, setModal] = useState(false);
  const [modalWidth, setModalWidth] = useState(Math.min(window.innerWidth * 0.8, 600));
  const [currentPatient, setCurrentPatient] = useState({
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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setModalWidth(Math.min(window.innerWidth * 0.8, 600));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleModal = () => {
    if (modal) {
      setErrors({});
    }
    setModal(!modal);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCurrentPatient((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  const handleSubmit = async () => {
    const validationErrors = ValidatePatient(currentPatient);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      const patientToUpdate = {
        id: currentPatient.id,
        firstName: currentPatient.firstName,
        lastName: currentPatient.lastName,
        ssn: currentPatient.ssn,
        email: currentPatient.email,
        street: currentPatient.street,
        city: currentPatient.city,
        state: currentPatient.state,
        zip: currentPatient.zip,
        age: currentPatient.age,
        height: currentPatient.height,
        weight: currentPatient.weight,
        gender: currentPatient.gender,
        insurance: currentPatient.insurance
      };
      await updatePatient(patientToUpdate);
      setErrors({});
      toggleModal();
      onRefresh();
      setCurrentPatient({
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
    } catch (err) {
      setErrors({ form: err.response ? err.response.data : err.message });
    }
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const handleUpdatePatient = async (id) => {
    try {
      const patientById = await getPatientById(id);
      const experimentPatient = {
        id: patientById.id,
        firstName: patientById.firstName,
        lastName: patientById.lastName,
        ssn: patientById.ssn,
        email: patientById.email,
        street: patientById.street,
        city: patientById.city,
        state: patientById.state,
        zip: patientById.zip,
        age: patientById.age,
        height: patientById.height,
        weight: patientById.weight,
        gender: patientById.gender,
        insurance: patientById.insurance
      };
      setCurrentPatient(experimentPatient);
      toggleModal();
    } catch (err) {
      setErrors({ form: err.message });
    }
  };

  const handleCancel = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to cancel?')) {
      setCurrentPatient({});
      toggleModal();
    }
  };

  // Change this so the table shows only the neccessary fields
  return (
    <>
      <div className='edit-container'>
        <EditIcon className='edit-icon' fontSize='small' onClick={() => handleUpdatePatient(patient.id)} />
      </div>
      {modal && (
        <div className='modal'>
          <div className='overlay' />
          <div className='modal-content' style={{ maxWidth: modalWidth }}>
            <div className='modal-header'>
              <h2>UPDATE PATIENT FORM</h2>
            </div>
            <PatientForm
              fields={fields}
              patient={currentPatient}
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
