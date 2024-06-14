/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useState, forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';

function InputField({ id, label, dropdownOptions, multiple, required, type, value, onBlur, onChange, error }) {
  if (type === 'dropdown') {
    return (
      <div className={`input-field ${id}}`} id={id}>
        <label htmlFor={id}>{label}</label>
        <select
          className={`${error ? 'input-flex-error' : 'input-flex'}`}
          id={id}
          multiple={multiple}
          onBlur={onBlur}
          onChange={onChange}
          required={required}
          type={type}
          value={value}
        >
          <option value='' />
          {dropdownOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <div className='error-message'>{error}</div>}
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <div className={`input-field checkbox-field ${id}`} id={id}>
        <label htmlFor={id}>
          <input type='checkbox' id={id} checked={value} onChange={onChange} required={required} />
          {label}
        </label>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className={`input-field ${id}`} id={id}>
        <label htmlFor={id}>{label}:</label>
        <textarea
          className={`${error ? 'input-flex-error' : 'input-flex'}`}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
        />
        {error && <div className='error-message'>{error}</div>}
      </div>
    );
  }

  // Multiselect mapping of options and values into array
  if (type === 'multiselect' && Array.isArray(dropdownOptions)) {
    return (
      <div className={`input-field ${id}`} id={id}>
        <label htmlFor={id}>{label}</label>
        <select
          className='input-multi-select'
          id={id}
          multiple={multiple}
          onChange={onChange}
          required={required}
          type={type}
          value={multiple ? value || [] : value}
        >
          <option value='' />
          {dropdownOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Ensuring vendorId only has numeric characters
  if (id === 'vendorId') {
    return (
      <div className={`input-field ${id}`} id={id}>
        <label htmlFor={id}>{label}:</label>
        <div className='input-wrapper'>
          <input
            className={`${error ? 'input-flex-error' : 'input-flex'}`}
            id={id}
            type='text'
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            pattern='\d*'
          />
        </div>
        {error && <div className='error-message'>{error}</div>}
      </div>
    );
  }

  // Adding a `$` sign to monetary fields
  if (type === 'number' && (id === 'cost' || id === 'salePrice')) {
    return (
      <div className={`input-field ${id}`} id={id}>
        <label htmlFor={id}>{label}:</label>
        <div className='input-wrapper'>
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
            decimalScale={2}
            fixedDecimalScale
            prefix='$'
          />
        </div>
        {error && <div className='error-message'>{error}</div>}
      </div>
    );
  }

  if (type === 'number' && id === 'markup') {
    return (
      <div className={`input-field ${id}`} id={id}>
        <label htmlFor={id}>{label}:</label>
        <div className='input-wrapper'>
          <NumericFormat
            className={`${error ? 'input-flex-error' : 'input-flex'}`}
            id={id}
            value={value}
            onValueChange={(values) => {
              const { value: formattedValue } = values;
              onChange({ target: { id, value: formattedValue } });
            }}
            thousandSeparator={false}
            defaultValue='0'
            decimalScale={0}
            fixedDecimalScale={false}
            suffix='%'
          />
        </div>
        {error && <div className='error-message'>{error}</div>}
      </div>
    );
  }

  return (
    <div className={`input-field ${id}`} id={id}>
      <label htmlFor={id}>{label}:</label>
      <div className='input-wrapper'>
        <input
          className={`${error ? 'input-flex-error' : 'input-flex'}`}
          id={id}
          type='text'
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
}
const ProductForm = forwardRef(({ fields, onSubmit }, ref) => {
  const initializedValues = () => {
    const initialValues = {};
    fields.forEach((field) => {
      if (field.type === 'checkbox') {
        initialValues[field.id] = false;
      } else if (field.type === 'multiselect') {
        initialValues[field.id] = [];
      } else if (field.id === 'cost') {
        initialValues[field.id] = '0.00';
      } else {
        initialValues[field.id] = '';
      }
    });
    return initialValues;
  };

  const [formValues, setFormValues] = useState(initializedValues);

  const handleChange = (e) => {
    const { id, type, checked, multiple, options, value } = e.target;

    if (id === 'vendorId') {
      const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: numericValue
      }));
      return;
    }

    // Only allow non-negative values for cost and markup
    if (id === 'cost' || id === 'markup') {
      const numericValue = value.replace(/[^0-9.]/g, ''); // Allow only numbers and dot
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: numericValue
      }));
      return;
    }

    // Rendering inputted or selected values for input, multiselect, checkbox fields
    if (type !== 'select-multiple') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: type === 'checkbox' ? checked : value
      }));
    } else if (multiple) {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: selectedOptions
      }));
    } else if (id === 'type') {
      setFormValues((prevValues) => ({
        ...prevValues,
        type: value
      }));
    } else {
      setFormValues((prevValues) => ({
        //
        ...prevValues,
        [id]: value
      }));
    }

    // Ensure 'type' is included in formValues if it's a drink
    // Necessary to ensure 'type' is a required field when classification = `Drink`
    if (id === 'classification' && value === 'Drink') {
      setFormValues((prevValues) => ({
        ...prevValues,
        type: '' // Initialize `type` as empty string
      }));
    }
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    if ((id === 'cost' || id === 'markup') && value === '') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: '0.00'
      }));
    }
  };

  // Auto-calculate read-only salePrice value based on cost & markup
  const calculateSalePrice = () => {
    const cost = parseFloat(formValues.cost) || 0;
    const markup = parseFloat(formValues.markup) || 0;
    return (cost * (1 + markup / 100)).toFixed(2);
  };

  // Conditionally render the type field based on classification of drink
  const drinkTypeFields =
    formValues.classification === 'Drink'
      ? [
          {
            id: 'type',
            label: 'Drink Type',
            required: true,
            type: 'dropdown',
            dropdownOptions: ['Coffee', 'Tea', 'Soda']
          }
        ]
      : [];

  // Conditionally render the markup field based on classification of bakedGood
  const bakedGoodMarkupField =
    formValues.classification === 'Baked Good' && formValues.vendorId
      ? [
          {
            id: 'markup',
            label: 'Markup',
            min: 0.0,
            step: 0.01,
            type: 'number'
          }
        ]
      : '';

  // Combining always-on fields & conditionally rendered fields
  const allFields = [...fields, ...drinkTypeFields, ...bakedGoodMarkupField];
  const [errors, setErrors] = useState({});

  const isFormValid = () => {
    const error = {};
    if (formValues.description.length > 100) {
      error.description = 'Description must be 100 characters or less.';
    }
    if (formValues.description.length < 1) {
      error.description = 'Must have a product description';
    }
    if (formValues.name.length > 50) {
      error.name = 'Name must be 50 characters or less.';
    }
    if (formValues.name.length < 1) {
      error.name = 'Must include product name.';
    }
    if (formValues.classification === 'Baked Good' && formValues.vendorId.length < 1) {
      error.vendorId = 'Must include Vendor Id for Baked Good Products.';
    }
    if (formValues.ingredientsList.length < 1) {
      error.ingredientsList = 'Must have at least 1 ingredient.';
    }
    if (formValues.classification === '') {
      error.classification = 'Classification must be Drink or Baked Good.';
    }
    if (formValues.classification === 'Drink' && formValues.type === '') {
      error.type = 'Must choose a Drink Type.';
    }
    const wholeNumberPattern = /^\d+$/;
    if (
      formValues.classification === 'Baked Good' &&
      (formValues.markup === '' || !wholeNumberPattern.test(formValues.markup))
    ) {
      error.markup = 'Markup must be a whole number.';
    }
    const costPattern = /^\d\.\d{2}$/;
    if (!costPattern.test(formValues.cost)) {
      error.cost = 'Must be numbers in the following format: X.XX';
    }
    if (formValues.cost === '0.00') {
      error.cost = 'Cost must be greater than 0';
    }
    setErrors(error);
    const errorCheck = Object.keys(error).length === 0;
    return errorCheck;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid(formValues)) {
      const filteredAllergenList = formValues.allergenList.filter((allergen) => allergen !== '');
      const correctVariableFormValues = {
        ...formValues,
        ingredientsList: formValues.ingredientsList.split(',').map((ingredient) => ingredient.trim()),
        allergenList: filteredAllergenList,
        cost: formValues.cost.toString(),
        salePrice: calculateSalePrice().toString()
      };
      if (formValues.classification === 'Baked Good') {
        correctVariableFormValues.markup = formValues.markup.toString();
        correctVariableFormValues.vendorId = formValues.vendorId.toString();
      }
      onSubmit(correctVariableFormValues);
    }
  };

  return (
    <form className='input-container' onSubmit={handleSubmit} ref={ref}>
      {allFields.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          label={field.label}
          multiple={field.multiple || false} // changed
          type={field.type || 'text'}
          value={formValues[field.id] || ''}
          onBlur={handleBlur}
          onChange={handleChange}
          dropdownOptions={field.dropdownOptions || []}
          error={errors[field.id]}
        />
      ))}
      <div className='input-field'>
        <label htmlFor='salePrice'>
          Sale Price:
          <input id='salePrice' type='text' value={`$${calculateSalePrice()}`} readOnly />
        </label>
      </div>
    </form>
  );
});

export default ProductForm;
