/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */
import React from 'react';

const stateAbbreviations = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
];

function InputField({ id, label, value, onChange }) {
  const handleChange = (e) => {
    const { id, value } = e.target;
    onChange(id, value);
  };

  if (id === 'address.state') {
    return (
      <div className={`input-field ${id}`} style={{ gridColumn: 1 }}>
        <label htmlFor={id}>{label}:</label>
        <select className='input-flex' id={id} value={value} onChange={handleChange}>
          <option value=''>Select State</option>
          {stateAbbreviations.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (id === 'address.zipCode') {
    return (
      <div className={`input-field ${id}`} style={{ gridColumn: 2 }}>
        <label htmlFor={id}>{label}:</label>
        <input className='input-flex' id={id} type='text' value={value} onChange={handleChange} />
      </div>
    );
  }

  return (
    <div className={`input-field ${id}`}>
      <label htmlFor={id}>{label}:</label>
      <input className='input-flex' id={id} type='text' value={value} onChange={handleChange} />
    </div>
  );
}

export default function VendorForm({ fields, vendor, onChange }) {
  return (
    <form style={{ paddingBottom: '5%' }} className='input-container'>
      {fields.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          label={field.label}
          value={field.keys.split('.').reduce((o, i) => o[i], vendor)}
          onChange={onChange}
        />
      ))}
    </form>
  );
}
