/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React from 'react';
import { NumericFormat } from 'react-number-format';

/**
 * Renders an input field of various types including text, textarea, numeric, checkbox, dropdown, and multiselect.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The unique identifier for the input field.
 * @param {string} props.label - The label text for the input field.
 * @param {any} props.value - The current value of the input field.
 * @param {Function} props.onChange - The callback function to handle changes to the input field.
 * @param {Function} props.onClear - The callback function to handle clearing the input field.
 * @param {string} props.type - The type of the input field (e.g., 'text', 'textBig', 'numeric', 'checkbox', 'dropdown', 'multiselect').
 * @param {Array} [props.dropDownOptions] - The options for dropdown fields.
 * @param {Array} [props.multiSelectOptions] - The options for multiselect fields.
 * @param {string} [props.error] - The error message for the input field.
 * @param {number} [props.gridNum] - The grid column number for the input field.
 */
function InputField({
  id,
  label,
  value,
  onChange,
  onClear,
  type,
  dropDownOptions,
  multiSelectOptions,
  error,
  gridNum
}) {
  const style = gridNum ? { gridColumn: gridNum } : {};

  if (type === 'text') {
    return (
      <div className={`input-field ${id}`} id={id} style={style}>
        <label htmlFor={id}>{label}:</label>
        <input
          className={`${error ? 'input-flex-error' : 'input-flex'}`}
          id={id}
          type='text'
          value={value}
          onChange={onChange}
        />
        {value && (
          <button type='button' className='clear-button' onClick={() => onClear(id)}>
            X
          </button>
        )}
        {error && <div className='error-message'>{error}</div>}
      </div>
    );
  }
  if (type === 'textBig') {
    return (
      <div className={`input-field ${id}`} id={id} style={style}>
        <label htmlFor={id}>{label}:</label>
        <textarea
          className={`${error ? 'input-flex-error' : 'input-flex'}`}
          id={id}
          value={value}
          onChange={onChange}
        />
        {value && (
          <button type='button' className='clear-button' onClick={() => onClear(id)}>
            X
          </button>
        )}
        {error && <div className='error-message'>{error}</div>}
      </div>
    );
  }
  if (type.includes('numeric')) {
    return (
      <div className={`input-field ${id}`} id={id} style={style}>
        <label htmlFor={id}>{label}:</label>
        <div className='input-wrapper-numeric'>
          <NumericFormat
            className={`${error ? 'input-flex-error' : 'input-flex'}`}
            id={id}
            value={value}
            onValueChange={(values) => {
              const { value: formattedValue } = values;
              onChange({ target: { id, value: formattedValue } });
            }}
            thousandSeparator={false}
            defaultValue='0.00'
            decimalScale={type.includes('Whole') ? 0 : 2}
            fixedDecimalScale
            prefix={type.includes('Dollar') ? '$' : ''}
            suffix={type.includes('Percent') ? '%' : ''}
          />

          {value && (
            <button type='button' className='clear-button-numeric' onClick={() => onClear(id)}>
              X
            </button>
          )}
        </div>
        {error && <div className='error-message'>{error}</div>}
      </div>
    );
  }
  if (type === 'checkbox') {
    return (
      <div className={`input-field checkbox-field ${id}`} id={id} style={style}>
        <label htmlFor={id}>
          <input type='checkbox' id={id} checked={value} onChange={onChange} style={{ marginRight: '170px' }} />
          {label}
        </label>
      </div>
    );
  }
  if (type === 'dropdown') {
    return (
      <div className={`input-field ${id}`} style={style}>
        <label htmlFor={id}>{label}:</label>
        <select className={`${error ? 'input-flex-error' : 'input-flex'}`} id={id} value={value} onChange={onChange}>
          <option value=''>Select Type</option>
          {dropDownOptions.map((dropdown) => (
            <option key={dropdown} value={dropdown}>
              {dropdown}
            </option>
          ))}
        </select>
        {error && <div className='error-message'>{error}</div>}
      </div>
    );
  }
  if (type === 'multiselect') {
    return (
      <div className={`input-field ${id}`} id={id} style={style}>
        <label htmlFor={id}>{label}:</label>
        <select
          className='input-multi-select'
          id={id}
          value={Array.isArray(value) ? value : []}
          multiple
          onChange={onChange}
        >
          {multiSelectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

/**
 * Renders a form with a collection of input fields based on the provided fields configuration.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.fields - The fields to be displayed in the form.
 * @param {Object} props.object - The current values of the form fields.
 * @param {Array} props.dropDownOptions - The options for dropdown fields.
 * @param {Array} props.multiSelectOptions - The options for multiselect fields.
 * @param {Function} props.onChange - The callback function to handle changes to the form fields.
 * @param {Object} props.error - The error messages for the form fields.
 * @param {Object} props.style - Custom styles for the form.
 */
export default function Form({ fields, object, dropDownOptions, multiSelectOptions, onChange, error, style }) {
  /**
   * Handles clearing the value of a specific field.
   *
   * @param {string} fieldKeys - The key of the field to be cleared.
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

  // Sort the fields based on their form order, excluding fields with a formOrder of 0
  const sortedFields = [...fields].filter((field) => field.formOrder !== 0).sort((a, b) => a.formOrder - b.formOrder);

  return (
    <form className='input-container' style={style}>
      {sortedFields.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          label={field.label}
          value={object[field.id] || ''}
          onChange={onChange}
          onClear={handleClear}
          type={field.type}
          error={error[field.id]}
          dropDownOptions={dropDownOptions}
          multiSelectOptions={multiSelectOptions}
          gridNum={field.gridNum}
        />
      ))}
    </form>
  );
}
