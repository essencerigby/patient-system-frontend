/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import React from 'react';
import { NumericFormat } from 'react-number-format';

function InputField({ id, label, value, onChange, onClear, validationErrors }) {
  const { nameError, emailError, lifetimeSpentError } = validationErrors;

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

  // Uses conditional rendering using email validation results from NewCustomerModal
  if (id === 'emailAddress') {
    return (
      <div className={`input-field ${id}`} id={id}>
        <label htmlFor={id}>{label}:</label>
        {emailError.length === 0 && (
          <input
            className='input-flex'
            id={id}
            type='text'
            value={value}
            onChange={onChange}
            style={{ position: 'relative' }}
          />
        )}
        {emailError && (
          <input
            className='input-flex-error'
            id={id}
            type='text'
            value={value}
            onChange={onChange}
            style={{ position: 'relative' }}
          />
        )}
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

  if (id === 'lifetimeSpent') {
    return (
      <div className={`input-field ${id}`} id={id}>
        <label htmlFor={id}>{label}:</label>
        <div className='input-wrapper'>
          {lifetimeSpentError.length === 0 && (
            <NumericFormat
              className='input-flex'
              id={id}
              value={value}
              onValueChange={(values) => {
                const { value: formattedValue } = values;
                onChange({ target: { id, value: formattedValue } });
              }}
              thousandSeparator={false}
              defaultValue='0.00'
              decimalScale={2}
              fixedDecimalScale
              prefix='$'
            />
          )}
        </div>
        {lifetimeSpentError && (
          <NumericFormat
            className='input-flex-error'
            id={id}
            value={value}
            onValueChange={(values) => {
              const { value: formattedValue } = values;
              onChange({ target: { id, value: formattedValue } });
            }}
            thousandSeparator={false}
            defaultValue='0.00'
            decimalScale={2}
            fixedDecimalScale
            prefix='$'
          />
        )}
        {value !== '0.00' && lifetimeSpentError.length === 0 && (
          <button type='button' className='clear-button' onClick={() => onClear(id)}>
            X
          </button>
        )}
        {value !== '0.00' && lifetimeSpentError && (
          <button type='button' className='clear-button-error' onClick={() => onClear(id)}>
            X
          </button>
        )}
        {lifetimeSpentError && <div className='error-message'>{lifetimeSpentError}</div>}
      </div>
    );
  }

  // Uses conditional rendering using name validation results from NewCustomerModal
  return (
    <div className={`input-field ${id}`}>
      <label htmlFor={id}>{label}:</label>
      {nameError.length === 0 && (
        <input
          className='input-flex'
          id={id}
          type='text'
          value={value}
          onChange={onChange}
          style={{ position: 'relative' }}
        />
      )}
      {nameError && (
        <input
          className='input-flex-error'
          id={id}
          type='text'
          value={value}
          onChange={onChange}
          style={{ position: 'relative' }}
        />
      )}
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

export default function CustomerForm({ fields, onChange, customer, validationErrors }) {
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
      {fields.map((field) => {
        const value =
          field.id === 'lifetimeSpent'
            ? customer[field.id] || '0.00'
            : field.keys.split('.').reduce((o, i) => o[i], customer);

        return (
          <InputField
            key={field.id}
            id={field.id}
            label={field.label}
            value={value}
            onChange={onChange}
            onClear={handleClear}
            validationErrors={validationErrors}
          />
        );
      })}
    </form>
  );
}
