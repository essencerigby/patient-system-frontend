/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import '../index.css';
import '../Component/Modal.css';
import StickyHeadTable, { createRow } from '../Component/Table';
import { getIngredients, createIngredient } from '../apiService';
import ReusableModal from '../Component/ReusableModal';
import SuccessModal from '../Component/SuccessModal';
import { ingredientValidation } from '../Validation';
import { ingredientFormatting } from '../Formatting';

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
    { id: 'id', label: 'ID', minWidth: 50, type: 'none', formOrder: 0 },
    { id: 'name', label: 'Name', minWidth: 100, type: 'text', formOrder: 2 },
    { id: 'active', label: 'Active', minWidth: 100, type: 'checkbox', formOrder: 1 },
    { id: 'purchasingCost', label: 'Purchasing Cost', minWidth: 100, type: 'numericDollar', formOrder: 5 },
    { id: 'amount', label: 'Unit Amount', minWidth: 100, type: 'numeric', formOrder: 3, gridNum: 1 },
    { id: 'unitOfMeasure', label: 'Unit of Measure', minWidth: 100, type: 'dropdown', formOrder: 4, gridNum: 2 },
    { id: 'allergens', label: 'Allergens', minWidth: 100, type: 'multiselect', formOrder: 6 }
  ];

  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]);

  // Toggles the refresh state, to trigger a refresh when a new vendor is successfully submitted.
  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

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
  ingredients.map((ingredient) =>
    rows.push(
      createRow(columns, [
        ingredient.id,
        <input type='checkbox' checked={ingredient.active} onChange={() => {}} disabled id={ingredient.id} />,
        ingredient.name,
        formatPrice(ingredient.purchasingCost),
        ingredient.amount,
        ingredient.unitOfMeasure,
        displayDash(formatList(ingredient.allergens))
        // PLACEHOLDER FOR DeleteIngredient & toggleSuccessModal
        // <DeleteIngredientModal ingredient={ingredient} onRefresh={handleRefresh}
        // toggleSuccessModal={toggleSuccessModal} />
      ])
    )
  );

  // If there are less than 6 rows, create empty rows to fill out table
  while (rows.length < 6) {
    rows.push(createRow(columns, Array(columns.length).fill('')));
  }

  // Props that get passed into the reusable modal
  const unitOfMeasure = ['OZ', 'LB', 'KG', 'ML', 'TSP', 'TBSP', 'CUPS'];
  const allergenList = ['Dairy', 'Gluten', 'Nuts', 'Soy'];
  const style = {
    modalStyling: { gridTemplateColumns: '1fr 1fr 1fr', maxWidth: '400px' },
    xButtonError: { transform: 'translateY(-130%)' }
  };
  return (
    <div className='pages-table'>
      <div className='header-modal-container'>
        <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Ingredients</h1>
        <ReusableModal
          fields={columns}
          header='NEW INGREDIENT FORM'
          dropDownOptions={unitOfMeasure}
          multiSelectOptions={allergenList}
          onRefresh={handleRefresh}
          createObject={createIngredient}
          validation={ingredientValidation}
          format={ingredientFormatting}
          style={style}
        />
      </div>
      {successModal && <SuccessModal message='Ingredient was successfully deleted!' onClose={toggleSuccessModal} />}
      <StickyHeadTable columns={columns} rows={rows} />
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
}
