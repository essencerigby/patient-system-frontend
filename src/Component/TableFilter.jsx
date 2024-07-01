import React, { useState, useEffect } from 'react';

/**
 * TableFilter component renders an input and buttons that facilitiate
 * sorting features for table data.
 *
 * @component
 * @example
 *  const fields = [
 *   { id: 'id', label: 'ID' },
 *   { id: 'name', label: 'Name', keys: 'name' },
 *   {
 *     id: 'street', label: 'Street', keys: 'street', fieldPath: '.address.street'
 *   },
 *   {
 *     id: 'street2', label: 'Street 2', keys: 'street2', fieldPath: '.address.street2'
 *   },
 *   {
 *     id: 'city', label: 'City', keys: 'city', fieldPath: '.address.city'
 *   },
 * ];
 *
 * return <TableFilter
 *          fields={temporaryFields}
 *          getDomain={getCustomers}
 *          setDomain={setCustomers}
 *          setError={setError}
 *          onRefresh={handleRefresh}
 *         />
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.getDomain - Function that retrieves the domain data from an API or service.
 * @param {Array} props.setDomain - Function to set the domain data in the parent component state.
 * @param {Array} props.onRefresh - Function triggered to refresh the table data.
 * @param {Array} props.fields - Array of objects describing the columns and fields in the table.
 * @param {Array} props.setError - Function to set an API error state in the parent component.
 *
 * @returns {JSX.Element} A React component that renders a table with sticky headers and sorting.
 */
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

  // List of fields that contain numerical data
  const numericalFields = [
    'lifetimeSpent',
    'cost',
    'markup',
    'salePrice',
    'purchasingCost',
    'unitAmount'
  ];

  // List of fields that contain list or array data
  const listFields = [
    'allergens',
    'allergenList',
    'ingredientList'
  ];

  // List of fields that contain checkbox fields
  const checkboxFields = [
    'active'
  ];

  // List of operands for numerical data
  const operands = [
    '=',
    '>',
    '<',
    '>=',
    '<='
  ];

  // Sets fieldPaths for any object containing an object
  useEffect(() => {
    const paths = fields
      .filter((obj) => obj.fieldPath)
      .map((obj) => ({
        id: obj.id,
        fieldPath: obj.fieldPath
      }));
    setFieldPaths(paths);
  }, [fields]);

  // Function that retrieves data from the API
  const fetchDomain = async () => {
    try {
      const domainData = await getDomain();
      domainData.sort((a, b) => (a.id > b.id ? 1 : -1));
      setDomainToSearch(domainData);
    } catch (err) {
      setError(err);
    }
  };

  // Refreshes the list when rendering search
  useEffect(() => {
    fetchDomain();
  });

  // Sets search value based on user input
  const handleWordInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  // Sets checkbox search value on user input
  const handleCheckBoxInputChange = (event) => {
    const { checked } = event.target;
    setCheckboxSearchValue(checked);
  };

  // Handles submission and filtering of data
  const filterDomainByField = (value) => {
    try {
      // Try and retrieve data before filtering
      fetchDomain();

      // Checks if field has a fieldPath
      const fieldPathExists = fieldPaths.some((path) => path.id === fieldToFilterBy);
      const fieldPathObj = fieldPathExists ? fieldPaths
        .filter((path) => path.id === fieldToFilterBy)[0] : {};
      const { fieldPath } = fieldPathObj;

      // The filtered results
      let filteredResults;

      // Regular Expression that searches a string for a matching word, case insensitive
      const wordRegex = new RegExp(`\\b${value}\\b`, 'i');

      const dividedFieldPath = fieldPathExists ? fieldPath.split('.') : null;
      const filteredParts = fieldPathExists ? dividedFieldPath.filter((path) => path !== '') : null;

      // Searches data for matching text
      const filterByText = () => {
        if (fieldPathExists) {
          filteredResults = domainToSearch
            .filter((obj) => wordRegex.test(obj[filteredParts[0]][filteredParts[1]]));
        } else {
          filteredResults = domainToSearch.filter((obj) => wordRegex.test(obj[fieldToFilterBy]));
        }
      };

      // Searches data for matching numbers based on operands.
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

      // Searchs data based on checkbox value
      const filterByCheckbox = () => {
        filteredResults = domainToSearch.filter((obj) => obj.active === checkboxSearchValue);
      };

      // Searches data lists for matching value
      const filterByList = () => {
        filteredResults = domainToSearch.filter((obj) => {
          const fieldValues = obj[fieldToFilterBy].map((item) => item.toLowerCase());
          const lowerCaseValue = value;

          return fieldValues.includes(lowerCaseValue);
        });
      };

      // Determines which filter function to use for checks
      if (numericalFields.includes(fieldToFilterBy)) {
        filterByNumber();
      } else if (checkboxFields.includes(fieldToFilterBy)) {
        filterByCheckbox();
      } else if (listFields.includes(fieldToFilterBy)) {
        filterByList();
      } else {
        filterByText();
      }

      setDomain(filteredResults); // Sets parent component's domain variable to results for display
    } catch (err) {
      setError(err); // Sets parent component's error variable
    }
  };

  // Return the search table component using conditional rendering.
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
