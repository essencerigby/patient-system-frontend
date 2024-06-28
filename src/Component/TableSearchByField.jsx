/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState } from 'react';

export default function TableSearchByField(props) {
  const [searchValue, setSearchValue] = useState('');
  const { domainToSearch, setDomain } = props;

  const handleWordInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    console.log(value); // Log the updated value
  };

  const filterDomainByAttribute = (nameValue) => {
    const wordRegex = new RegExp(`\\b${nameValue}\\b`, 'i');

    const filteredResults = domainToSearch.filter((obj) => wordRegex.test(obj.name));

    setDomain(filteredResults);
    console.log(nameValue);
    console.log(filteredResults);
  };

  return (
    <>
      <input
        className='input-flex'
        id='test'
        type='text'
        onChange={(event) => handleWordInputChange(event)}
        style={{ position: 'relative' }}
      />
      <button type='button' className='btn-modal' onClick={() => { filterDomainByAttribute(searchValue); }}>
        <strong>Search</strong>
      </button>
    </>
  );
}
