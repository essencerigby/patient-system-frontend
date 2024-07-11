import React from 'react';

function InputField({
  id, label, value, onChange, onClear, validationErrors, required
}) {
  const { numberOfNightsError = '', guestEmailError = '', checkInDateError = '' } = validationErrors;

  /**
   * Function to display required symbol
   * @returns A red asterik if field is required, if not nothing is shown
   */
  const renderRequired = () => {
    if (required) {
      return <span style={{ color: 'red' }}> *</span>;
    }
    return null;
  };

  /**
   * Uses conditional rendering using email validation results from CreateReservationModal
   * @returns red textbox and error message if correct format is not used
   */
  if (id === 'guestEmail') {
    return (
      <div className={`input-field ${id}`} id={id}>
        <label htmlFor={id}>
          {label}:{renderRequired()}
        </label>
        {guestEmailError.length === 0 && (
          <input
            className='input-flex'
            id={id}
            type='text'
            value={value}
            onChange={onChange}
            style={{ position: 'relative' }}
          />
        )}
        {guestEmailError && (
          <input
            className='input-flex-error'
            id={id}
            type='text'
            value={value}
            onChange={onChange}
            style={{ position: 'relative' }}
          />
        )}
        {value && guestEmailError.length === 0 && (
          <button type='button' className='clear-button' onClick={() => onClear(id)}>
            X
          </button>
        )}
        {value && guestEmailError && (
          <button type='button' className='clear-button-error' onClick={() => onClear(id)}>
            X
          </button>
        )}
        {guestEmailError && <div className='error-message'>{guestEmailError}</div>}
      </div>
    );
  }
  /**
   * Uses conditional rendering using checkInDate validation results from CreateReservationModal
   * @returns red textbox and error message if correct format is not used
  */
  if (id === 'checkInDate') {
    return (
      <div className={`input-field ${id}`} id={id}>
        <label htmlFor={id}>
          {label}:{renderRequired()}
        </label>
        {checkInDateError.length === 0 && (
        <input
          className='input-flex'
          id={id}
          type='text'
          value={value}
          onChange={onChange}
          style={{ position: 'relative' }}
        />
        )}
        {checkInDateError && (
          <input
            className='input-flex-error'
            id={id}
            type='text'
            value={value}
            onChange={onChange}
            style={{ position: 'relative' }}
          />
        )}
        {value && checkInDateError.length === 0 && (
          <button type='button' className='clear-button' onClick={() => onClear(id)}>
            X
          </button>
        )}
        {value && checkInDateError && (
          <button type='button' className='clear-button-error' onClick={() => onClear(id)}>
            X
          </button>
        )}
        {checkInDateError && <div className='error-message'>{checkInDateError}</div>}
      </div>
    );
  }

  /**
   * Uses conditional rendering using number of nights validation results from NewReservationModal
   * @returns red textbox and error message if correct format is not used
  */
  return (
    <div className={`input-field ${id}`}>
      <label htmlFor={id}>
        {label}:{renderRequired()}
      </label>
      {numberOfNightsError.length === 0 && (
        <input
          className='input-flex'
          id={id}
          type='text'
          value={value}
          onChange={onChange}
          style={{ position: 'relative' }}
        />
      )}
      {numberOfNightsError && (
        <input
          className='input-flex-error'
          id={id}
          type='text'
          value={value}
          onChange={onChange}
          style={{ position: 'relative' }}
        />
      )}
      {value && numberOfNightsError.length === 0 && (
        <button type='button' className='clear-button' onClick={() => onClear(id)}>
          X
        </button>
      )}
      {value && numberOfNightsError && (
        <button type='button' className='clear-button-error' onClick={() => onClear(id)}>
          X
        </button>
      )}
      {numberOfNightsError && <div className='error-message'>{numberOfNightsError}</div>}
    </div>
  );
}

export default function ReservationForm({
  fields, onChange, reservation, validationErrors
}) {
  /**
   * When initiated, the field is cleared and the user will have an empty textbox.
   */
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
          value={field.keys.split('.').reduce((o, i) => o[i], reservation)}
          onChange={onChange}
          onClear={handleClear}
          validationErrors={validationErrors}
          required={field.required}
        />
      ))}
    </form>
  );
}
