/* eslint-disable no-unused-vars */
import React from 'react';

function InputField({
  id, label, value, onChange
}) {
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
    </div>
  );
}

export default function CustomerForm({
  fields, onChange
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
          onChange={onChange}
          onClear={handleClear}
        />
      ))}
    </form>
  );
}
