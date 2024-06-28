/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function TableSearchByField(props) {
  const [searchValue, setSearchValue] = useState('');
  const [fieldToFilterBy, setFieldToFilterBy] = useState();
  const {
    domainToSearch, setDomain, onRefresh, fieldsToSearch
  } = props;

  const handleWordInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    // onRefresh();
    console.log(value); // Log the updated value
    console.log(fieldsToSearch);
  };

  const filterDomainByAttribute = (nameValue) => {
    const wordRegex = new RegExp(`\\b${nameValue}\\b`, 'i');

    const filteredResults = domainToSearch.filter((obj) => wordRegex.test(obj.name));

    setDomain(filteredResults);
    console.log(nameValue);
    console.log(filteredResults);
  };

  return (
    <div className='search-table'>
      <input
        className='input-flex'
        id='test'
        type='text'
        onChange={(event) => handleWordInputChange(event)}
        style={{ position: 'relative', width: 200, transform: 'translateX(-5%)' }}
      />

      <select onChange={(event) => setFieldToFilterBy(event.target.value)}>
        {fieldsToSearch.map((field) => (
          <option key={field.id} value={field.id}>
            {field.label}
          </option>
        ))}
      </select>

      <button type='button' style={{ transform: 'translateX(10%)' }} className='btn-modal' onClick={() => { filterDomainByAttribute(searchValue); }}>
        <strong>Search</strong>
      </button>
      <button type='button' style={{ transform: 'translateX(15%)' }} className='btn-modal' onClick={() => { onRefresh(); }}>
        <strong>Refresh Table</strong>
      </button>
    </div>
  );
}
