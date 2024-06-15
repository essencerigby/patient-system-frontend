import React, { useState, useEffect } from 'react';
import '../Component/Modal.css';
import { createVendor } from '../apiService';
import VendorForm from './VendorForm';

// Array of fields for the form
const fields = [
  { id: 'name', label: 'Name', keys: 'name' },
  { id: 'street', label: 'Street', keys: 'street' },
  { id: 'street2', label: 'Street 2', keys: 'street2' },
  { id: 'city', label: 'City', keys: 'city' },
  { id: 'state', label: 'State', keys: 'state' },
  { id: 'zipCode', label: 'Zip Code', keys: 'zipCode' },
  { id: 'email', label: 'Email', keys: 'email' },
  { id: 'contactName', label: 'Contact Name', keys: 'contactName' },
  { id: 'titleOrRole', label: 'Title or Role', keys: 'titleOrRole' },
  { id: 'phone', label: 'Phone', keys: 'phone' }
];

export default function AddVendor({ onRefresh }) {
  const [modal, setModal] = useState(false);
  const [modalWidth, setModalWidth] = useState(Math.min(window.innerWidth * 0.8, 600));
  const [vendor, setVendor] = useState({
    id: '',
    name: '',
    street: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    contactName: '',
    titleOrRole: '',
    phone: ''
  });

  const [error, setError] = useState(null);

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
      setError(null); // Reset error when closing the modal
    }
    setModal(!modal); // Toggle modal visibility
  };

  // This function handles changes in input fields of the vendor form.
  const handleChange = (e) => {
    const { id, value } = e.target;
    setVendor((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  // This function handles the submission of the vendor form.
  const handleSubmit = async () => {
    try {
      const vendorToCreate = {
        id: vendor.id,
        name: vendor.name,
        address: {
          street: vendor.street,
          street2: vendor.street2,
          city: vendor.city,
          state: vendor.state,
          zipCode: vendor.zipCode
        },
        contact: {
          contactName: vendor.contactName,
          email: vendor.email,
          titleOrRole: vendor.titleOrRole,
          phone: vendor.phone
        }
      };
      await createVendor(vendorToCreate);
      setError(null); // Reset error on successful submission
      toggleModal(); // Close the modal after successful submission
      onRefresh(); // Refresh the vendor list after successful submission
      setVendor({
        id: '',
        name: '',
        street: '',
        street2: '',
        city: '',
        state: '',
        zipCode: '',
        email: '',
        contactName: '',
        titleOrRole: '',
        phone: ''
      }); // Resetting the vendor state to its initial empty values after successful submission
    } catch (err) {
      setError(err.response ? err.response.data : err.message); // Set error if submission fails
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
        <strong>Add New +</strong>
      </button>
      {modal && (
        <div className='modal'>
          <div className='overlay' />
          <div className='modal-content' style={{ maxWidth: modalWidth }}>
            <div className='modal-header'>
              <h2>NEW VENDOR FORM</h2>
            </div>
            <VendorForm fields={fields} vendor={vendor} onChange={handleChange} />
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            <div className='btn-container'>
              <button type='button' className='close-modal' onClick={toggleModal}>
                Cancel
              </button>
              <button type='button' className='submit-close-modal' onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
