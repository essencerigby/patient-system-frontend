/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';
import '../Component/Modal.css';
import { createCustomer } from '../apiService';
import CustomerForm from './CustomerForm';

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
  const toggleModal = () => {
    if (modal) {
      setError(null); // Reset error when closing the modal
    }
    setModal(!modal); // Toggle modal visibility
  };

  const handleChange = (e) => {
    const {
      id, type, checked, value
    } = e.target;
    setCustomer((prevValues) => ({
      ...prevValues,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
    try {
      const customerToCreate = {
        active: customer.active,
        name: customer.name,
        emailAddress: customer.emailAddress,
        lifetimeSpent: 0
      };
      await createCustomer(customerToCreate);
      setError(null);
      toggleModal();
      onRefresh();
      setCustomer({
        active: false,
        name: '',
        emailAddress: ''
      });
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
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
            <CustomerForm fields={fields} customer={customer} onChange={handleChange} />
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
