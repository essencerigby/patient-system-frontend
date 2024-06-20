/* eslint-disable max-len */
/* eslint-disable no-confusing-arrow */
import React, { useState } from 'react';

/**
 * InputField component represents an input field within a form.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.id - The unique identifier for the input field.
 * @param {string} props.label - The label text for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChange - The function to handle changes to the input field.
 * @returns {JSX.Element} A React component representing an input field.
 */
// eslint-disable-next-line object-curly-newline
function InputField({ id, label, value, onChange }) {
  return (
    <div className={`input-field ${id}`} id={id}>
      <label htmlFor={id}>{label}:</label>
      <input className='input-flex' id={id} type='text' value={value} onChange={onChange} />
    </div>
  );
}

/**
 * Form component renders a form based on provided fields configuration.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array} props.fields - An array of field configurations.
 * @returns {JSX.Element} A React component representing a form.
 */
export default function Form({ fields }) {
  /**
   * Initializes form values based on the provided fields configuration.
   *
   * @returns {Object} Initial form values with keys corresponding to field IDs.
   */
  const initializedValues = () => {
    const initialValues = {};
    fields.forEach((field) => {
      initialValues[field.id] = '';
    });
    return initialValues;
  };

  // State to manage form values
  const [formValues, setFormValues] = useState(initializedValues);

  /**
   * Handles changes to form input fields.
   *
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  /**
   * Handles form submission.
   *
   * @param {Object} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here if needed
  };

  return (
    <form className='input-container' onSubmit={handleSubmit}>
      {/* Render input fields based on the provided fields configuration */}
      {fields.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          label={field.label}
          value={formValues[field.id] || ''}
          onChange={handleChange}
        />
      ))}
    </form>
  );
}
