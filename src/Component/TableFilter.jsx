import React, { useState, useEffect } from 'react';

export default function TableFilter(props) {
  const [textSearchValue, setSearchValue] = useState('');
  const [checkboxSearchValue, setCheckboxSearchValue] = useState(false);
  const [fieldToFilterBy, setFieldToFilterBy] = useState('id');
  const [operandToFilterBy, setOperandToFilterBy] = useState('=');
  const [fieldPaths, setFieldPaths] = useState([]);
  const [domainToSearch, setDomainToSearch] = useState({});

  const {
    getDomain, setDomain, onRefresh, fields, setError
  } = props;

  const numericalFields = [
    'lifetimeSpent',
    'cost',
    'markup',
    'salePrice',
    'purchasingCost',
    'unitAmount'
  ];

  const listFields = [
    'allergens',
    'allergenList',
    'ingredientList'
  ];

  const checkboxFields = [
    'active'
  ];

  const operands = [
    '=',
    '>',
    '<',
    '>=',
    '<='
  ];

  useEffect(() => {
    const paths = fields
      .filter((obj) => obj.fieldPath)
      .map((obj) => ({
        id: obj.id,
        fieldPath: obj.fieldPath
      }));
    setFieldPaths(paths);
  }, [fields]);

  const fetchDomain = async () => {
    try {
      const domainData = await getDomain();
      domainData.sort((a, b) => (a.id > b.id ? 1 : -1));
      setDomainToSearch(domainData);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchDomain();
  });

  const handleWordInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const handleCheckBoxInputChange = (event) => {
    const { checked } = event.target;
    setCheckboxSearchValue(checked);
  };

  const filterDomainByField = (value) => {
    try {
      fetchDomain();
      const fieldPathExists = fieldPaths.some((path) => path.id === fieldToFilterBy);
      const fieldPathObj = fieldPathExists ? fieldPaths
        .filter((path) => path.id === fieldToFilterBy)[0] : {};
      const { fieldPath } = fieldPathObj;

      let filteredResults;
      const wordRegex = new RegExp(`\\b${value}\\b`, 'i');

      const dividedFieldPath = fieldPathExists ? fieldPath.split('.') : null;
      const filteredParts = fieldPathExists ? dividedFieldPath.filter((path) => path !== '') : null;

      const filterByText = () => {
        if (fieldPathExists) {
          filteredResults = domainToSearch
            .filter((obj) => wordRegex.test(obj[filteredParts[0]][filteredParts[1]]));
        } else {
          filteredResults = domainToSearch.filter((obj) => wordRegex.test(obj[fieldToFilterBy]));
        }
      };

      const filterByNumber = () => {
        if (operandToFilterBy === '=') {
          filteredResults = domainToSearch
            .filter((obj) => Number(obj[fieldToFilterBy]) === Number(textSearchValue));
        } else if (operandToFilterBy === '>') {
          filteredResults = domainToSearch
            .filter((obj) => Number(obj[fieldToFilterBy]) > Number(textSearchValue));
        } else if (operandToFilterBy === '<') {
          filteredResults = domainToSearch
            .filter((obj) => Number(obj[fieldToFilterBy]) < Number(textSearchValue));
        } else if (operandToFilterBy === '>=') {
          filteredResults = domainToSearch
            .filter((obj) => Number(obj[fieldToFilterBy]) >= Number(textSearchValue));
        } else {
          filteredResults = domainToSearch
            .filter((obj) => Number(obj[fieldToFilterBy]) <= Number(textSearchValue));
        }
      };

      const filterByCheckbox = () => {
        filteredResults = domainToSearch.filter((obj) => obj.active === checkboxSearchValue);
      };

      const filterByList = () => {
        filteredResults = domainToSearch.filter((obj) => {
          const fieldValues = obj[fieldToFilterBy].map((item) => item.toLowerCase());
          const lowerCaseValue = value;

          return fieldValues.includes(lowerCaseValue);
        });
      };

      if (numericalFields.includes(fieldToFilterBy)) {
        filterByNumber();
      } else if (checkboxFields.includes(fieldToFilterBy)) {
        filterByCheckbox();
      } else if (listFields.includes(fieldToFilterBy)) {
        filterByList();
      } else {
        filterByText();
      }

      setDomain(filteredResults);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className='search-table'>
      {fieldToFilterBy !== 'active' && (
      <input
        className='input-flex'
        placeholder={`Search by ${fieldToFilterBy}${'...'}`}
        id='test'
        type='text'
        onChange={(event) => handleWordInputChange(event)}
        style={{ position: 'relative', width: 200, transform: 'translateX(-11%)' }}
      />
      )}

      {fieldToFilterBy === 'active' && (
        <input
          className='input-flex'
          id='test'
          type='checkbox'
          onChange={(event) => handleCheckBoxInputChange(event)}
          style={{ position: 'relative', width: 22, transform: 'translateX(-75%)' }}
        />
      )}

      {numericalFields.includes(fieldToFilterBy) && (
      <select style={{ position: 'relative', width: 45, transform: 'translateX(-25%)' }} onChange={(event) => { setOperandToFilterBy(event.target.value); }}>
        {operands.map((operand) => (
          <option key={operand} value={operand}>
            {operand}
          </option>
        ))}
      </select>
      )}

      <select style={{ transform: 'translateX(-5%)' }} onChange={(event) => { setFieldToFilterBy(event.target.value); }}>
        {fields.map((field) => (
          <option key={field.id} value={field.id}>
            {field.label}
          </option>
        ))}
      </select>

      <button type='button' style={{ transform: 'translateX(10%)' }} className='btn-modal' onClick={() => { filterDomainByField(textSearchValue); }}>
        <strong>Search</strong>
      </button>
      <button type='button' style={{ transform: 'translateX(15%)' }} className='btn-modal' onClick={() => { onRefresh(); }}>
        <strong>Refresh Table</strong>
      </button>
    </div>
  );
}
