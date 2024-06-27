import React, { useEffect, useState } from 'react';
import '../index.css';
import '../Component/Modal.css';
import StickyHeadTable, { createRow } from '../Component/Table';
import { getIngredients } from '../apiService';
import SuccessModal from '../Component/SuccessModal';

export default function IngredientPage() {
  const columns = [
    { id: 'id', label: 'ID', minWidth: 80 },
    { id: 'active', label: 'Active', minWidth: 20 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'purchasingCost', label: 'Purchasing Cost', minWidth: 100 },
    { id: 'unitAmount', label: 'Unit Amount', minWidth: 100 },
    { id: 'unitMeasure', label: 'Unit of Measure', minWidth: 100 },
    { id: 'allergenList', label: 'Allergens', minWidth: 100 }
  ];

  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);
  // const [refresh, setRefresh] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

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
  //   fetchIngredients();
  // }, [refresh]);

  const formatPrice = (price) => `$${price}`;

  const formatList = (list) => list.join(', ');

  const displayDash = (value) => (value === '' || value.toLowerCase() === 'n/a' ? '-' : value);

  // const handleRefresh = () => {
  //   setRefresh((prev) => !prev);
  // };

  const toggleSuccessModal = () => {
    if (successModal) {
      setError(null);
    }
    setSuccessModal(!successModal);
  };

  const rows = [];

  ingredients.map(
    (ingredient) => rows.push(
      createRow(
        columns,
        [
          // <EditIngredientModal ingredient={ingredient} fields={ingredientFields}
          // onRefresh={handleRefresh} />,
          ingredient.name,
          <input type='checkbox' checked={ingredient.active} onChange={() => { }} disabled />,
          formatPrice(ingredient.purchastingCost),
          ingredient.unitAmount,
          ingredient.unitMeasure,
          displayDash(formatList(ingredient.allergenList))
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
        {/* <IngredientModal fields={} onRefresh={handleRefresh} /> */}
      </div>
      {successModal && <SuccessModal message='Ingredient was successfully deleted!' onClose={toggleSuccessModal} />}
      <StickyHeadTable columns={columns} rows={rows} />
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
}
