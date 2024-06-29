/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function TableSearchByField(props) {
  const [textSearchValue, setSearchValue] = useState('');
  const [checkboxSearchValue, setCheckboxSearchValue] = useState(false);
  const [fieldToFilterBy, setFieldToFilterBy] = useState('id');
  const {
    domainToSearch, setDomain, onRefresh, fieldsToSearch, isVendor
  } = props;

  const handleWordInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    onRefresh();
  };

  const handleCheckBoxInputChange = (event) => {
    const { checked } = event.target;
    setCheckboxSearchValue(checked);
    onRefresh();
  };

  const filterDomainByAttribute = (nameValue) => {
    let filteredResults;
    const wordRegex = new RegExp(`\\b${nameValue}\\b`, 'i');

    // filter by ID
    if (fieldToFilterBy === 'id') {
      filteredResults = domainToSearch.filter((obj) => wordRegex.test(obj.id));
    }

    // filter By Name
    if (fieldToFilterBy === 'name') {
      filteredResults = domainToSearch.filter((obj) => wordRegex.test(obj.name));
    }

    // filter by Email
    if (fieldToFilterBy === 'emailAddress') {
      if (isVendor) {
        filteredResults = domainToSearch.filter((obj) => wordRegex.test(obj.contact.email));
      } else {
        filteredResults = domainToSearch.filter((obj) => wordRegex.test(obj.emailAddress));
      }
    }

    // filter by Active
    if (fieldToFilterBy === 'active') {
      filteredResults = domainToSearch.filter((obj) => obj.active === checkboxSearchValue);
    }

    setDomain(filteredResults);
  };

  return (
    <div className='search-table'>
      {fieldToFilterBy !== 'active' && (
      <input
        className='input-flex'
        id='test'
        type='text'
        onChange={(event) => handleWordInputChange(event)}
        style={{ position: 'relative', width: 200, transform: 'translateX(-5%)' }}
      />
      )}

      {fieldToFilterBy === 'active' && (
        <input
          className='input-flex'
          id='test'
          type='checkbox'
          onChange={(event) => handleCheckBoxInputChange(event)}
          style={{ position: 'relative', width: 22, transform: 'translateX(-30%)' }}
        />
      )}

      <select onChange={(event) => setFieldToFilterBy(event.target.value)}>
        {fieldsToSearch.map((field) => (
          <option key={field.id} value={field.id}>
            {field.label}
          </option>
        ))}
      </select>

      <button type='button' style={{ transform: 'translateX(10%)' }} className='btn-modal' onClick={() => { filterDomainByAttribute(textSearchValue); }}>
        <strong>Search</strong>
      </button>
      <button type='button' style={{ transform: 'translateX(15%)' }} className='btn-modal' onClick={() => { onRefresh(); }}>
        <strong>Refresh Table</strong>
      </button>
    </div>
  );
}
