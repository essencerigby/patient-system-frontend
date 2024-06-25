/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';
import '../Component/Modal.css';
import { createCustomer } from '../apiService';
import CustomerForm from './CustomerForm';

const fields = [
  { id: 'active', label: 'Active', keys: 'active' },
  { id: 'name', label: 'Name', keys: 'name' },
  { id: 'emailAddress', label: 'Email', keys: 'emailAddress' },
  { id: 'lifetimeSpent', label: 'Lifetime Spent' },
  { id: 'cutomerSince', label: 'Customer Since' }
];

export default function CustomerModal({ onRefresh }) {
  const [modal, setModal] = useState(false);
  const [customer, setCustomer] = useState({
    active: '',
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
    const { id, value, active } = e.target;
    setCustomer((prevValues) => ({
      ...prevValues,
      [id]: value,
      [active]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const customerToCreate = {
        active: customer.active ? true : false,
        name: customer.name,
        emailAddress: customer.emailAddress,
        lifetimeSpent: 0
      };
      console.log(customerToCreate); // delete this line later
      await createCustomer(customerToCreate);
      setError(null);
      toggleModal();
      onRefresh();
      setCustomer({
        active: '',
        name: '',
        emailAddress: '',
        lifetimeSpent: '',
        customerSince: ''
      });
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
      // alert(`Post Failed: ${error.message}`); delete this line later
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
