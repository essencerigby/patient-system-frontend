/* eslint-disable no-unused-vars */
import React from 'react';

function InputField({
  id, label, value, onChange, onClear, validationErrors
}) {
  const { nameError, emailError } = validationErrors;

  console.log(id);

  if (id === 'active') {
    return (
      <div className={`input-field checkbox-field ${id}`} id={id}>
        <label htmlFor={id}>
          <input type='checkbox' id={id} checked={value} onChange={onChange} />
          {label}
        </label>
      </div>
    );
  }

  if (id === 'emailAddress') {
    return (
      <div className={`input-field ${id}`}>
        <label htmlFor={id}>{label}:</label>
        <input
          className='input-flex'
          id={id}
          type='text'
          value={value}
          onChange={onChange}
          style={{ position: 'relative' }}
        />
        {value && emailError.length === 0 && (
          <button type='button' className='clear-button' onClick={() => onClear(id)}>
            X
          </button>
        )}
        {value && emailError && (
          <button type='button' className='clear-button-error' onClick={() => onClear(id)}>
            X
          </button>
        )}
        {emailError && <div className='error-message'>{emailError}</div>}
      </div>
    );
  }

  return (
    <div className={`input-field ${id}`}>
      <label htmlFor={id}>{label}:</label>
      <input
        className='input-flex'
        id={id}
        type='text'
        value={value}
        onChange={onChange}
        style={{ position: 'relative' }}
      />
      {value && nameError.length === 0 && (
      <button type='button' className='clear-button' onClick={() => onClear(id)}>
        X
      </button>
      )}
      {value && nameError && (
      <button type='button' className='clear-button-error' onClick={() => onClear(id)}>
        X
      </button>
      )}
      {nameError && <div className='error-message'>{nameError}</div>}
    </div>
  );
}

export default function CustomerForm({
  fields, onChange, customer, validationErrors
}) {
  const handleClear = (fieldKeys) => {
    const event = {
      target: {
        id: fieldKeys,
        value: ''
      }
    };
    onChange(event);
  };

  return (
    <form style={{ paddingBottom: '5%' }} className='input-container'>
      {fields.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          label={field.label}
          value={field.keys.split('.').reduce((o, i) => o[i], customer)}
          onChange={onChange}
          onClear={handleClear}
          validationErrors={validationErrors}
        />
      ))}
    </form>
  );
}
