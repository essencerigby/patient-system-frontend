import React, { useState } from 'react';

export default function TableSearchByField(props) {
  const [searchValue, setSearchValue] = useState('');
  const { domainToSearch, setDomain, onRefresh } = props;

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
    <div className='search-table'>
      <input
        className='input-flex'
        id='test'
        type='text'
        onChange={(event) => handleWordInputChange(event)}
        style={{ position: 'relative', width: 200 }}
      />
      <button type='button' style={{ transform: 'translateX(10%)' }} className='btn-modal' onClick={() => { filterDomainByAttribute(searchValue); }}>
        <strong>Search</strong>
      </button>
      <button type='button' style={{ transform: 'translateX(15%)' }} className='btn-modal' onClick={() => { onRefresh(); }}>
        <strong>Refresh Table</strong>
      </button>
    </div>
  );
}
