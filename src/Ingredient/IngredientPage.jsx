import React, { useEffect, useState } from 'react';
import '../index.css';
import '../Component/Modal.css';
import StickyHeadTable, { createRow } from '../Component/Table';
import { getIngredients } from '../apiService';
import SuccessModal from '../Component/SuccessModal';

/**
 *  * IngredientPage Component
 *
 * This component is responsible for displaying a table of ingredients retrieved from the backend.
 * It utilizes the Table component for the table structure. The component fetches ingredient data
 * using an asynchronous call to getingredients and handles potential errors.
 *
 * Functionality:
 * - Defines columns for the table, specifying the column ID, label, and minimum width
 * - Manages state for ingredients data and error handling
 * - Fetches ingredient data when the component mounts using useEffect, and updates state
 * - Dynamically creates rows for the table from the fetched ingredients data
 * - Displays the table with ingredients data and handles errors by displaying any errors
 *
 * @returns {JSX.Element} A React component that displays a ingredient page
 */

export default function IngredientPage() {
  const columns = [
    { id: 'id', label: 'ID', minWidth: 80 },
    { id: 'active', label: 'Active', minWidth: 20 },
    { id: 'name', label: 'Ingredient Name', minWidth: 100 },
    { id: 'purchasingCost', label: 'Purchasing Cost', minWidth: 100 },
    { id: 'amount', label: 'Unit Amount', minWidth: 100 },
    { id: 'unitOfMeasure', label: 'Unit of Measure', minWidth: 100 },
    { id: 'allergens', label: 'Allergens', minWidth: 100 }
  ];

  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);
  const [successModal, setSuccessModal] = useState(false);

  // Updating data display in table upon change in ingredients data provided by backend
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getIngredients();
        data.sort((a, b) => (a.id > b.id ? 1 : -1));
        setIngredients(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchIngredients();
  });

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  const formatList = (list) => (list ? list.join(', ') : '');

  const displayDash = (value) => (value === '' || value.toLowerCase() === 'n/a' ? '-' : value);

  const toggleSuccessModal = () => {
    if (successModal) {
      setError(null);
    }
    setSuccessModal(!successModal);
  };

  const rows = [];

  // Mapping ingredient data from API response body to column/row data
  ingredients.map(
    (ingredient) => rows.push(
      createRow(
        columns,
        [
          ingredient.id,
          // PLACEHOLDER FOR EditIngredient
          // <EditIngredientModal ingredient={ingredient} fields={ingredientFields}
          // onRefresh={handleRefresh} />,
          <input type='checkbox' checked={ingredient.active} onChange={() => { }} disabled />,
          ingredient.name,
          formatPrice(ingredient.purchasingCost),
          ingredient.amount,
          ingredient.unitOfMeasure,
          displayDash(formatList(ingredient.allergens))
          // PLACEHOLDER FOR DeleteIngredient & toggleSuccessModal
          // <DeleteIngredientModal ingredient={ingredient} onRefresh={handleRefresh}
          // toggleSuccessModal={toggleSuccessModal} />
        ]
      )
    )
  );

  // If there are less than 6 rows, create empty rows to fill out table
  while (rows.length < 6) {
    rows.push(createRow(columns, Array(columns.length).fill('')));
  }

  return (
    <div className='pages-table'>
      <div className='header-modal-container'>
        <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Ingredients</h1>
        {/* PLACEHOLDER */}
        {/* <IngredientModal fields={} onRefresh={handleRefresh} /> */}
      </div>
      {successModal && <SuccessModal message='Ingredient was successfully deleted!' onClose={toggleSuccessModal} />}
      <StickyHeadTable columns={columns} rows={rows} />
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
}
