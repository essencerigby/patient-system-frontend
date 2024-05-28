/* eslint-disable max-len */
/* eslint-disable no-confusing-arrow */
import React, { useState } from 'react';

// Create input fields with child elements of Form component
// Separate InputField Component
// eslint-disable-next-line object-curly-newline
function InputField({ id, label, value, onChange }) {
  return (
    <div className={`input-field ${id}`} id={id}>
      <label htmlFor={id}>{label}:</label>
      <input className='input-flex' id={id} type='text' value={value} onChange={onChange} />
    </div>
  );
}

// State set to empty strings for all input values
export default function Form() {
  const [formValues, setFormValues] = useState({
    vendorName: '',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    state: '',
    zipCode: '',
    contactName: ''
  });

  // Destructure target property to extract id and value
  // Update state to include new id Key + corresponding value
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Array of form field data
  const formFields = [
    { id: 'vendorName', label: 'Vendor Name' },
    { id: 'streetAddress1', label: 'Street Address 1' },
    { id: 'streetAddress2', label: 'Street Address 2' },
    { id: 'city', label: 'City' },
    { id: 'state', label: 'State' },
    { id: 'zipCode', label: 'Zip Code' },
    { id: 'contactName', label: 'Contact Name' }
  ];

  // Return desired setup for input field parameters
  return (
    <form className='input-container' onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          label={field.label}
          value={formValues[field.id]}
          onChange={handleChange}
        />
      ))}
    </form>
  );
}
