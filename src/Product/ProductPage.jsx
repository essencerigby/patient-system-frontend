/* eslint-disable arrow-body-style */
/**
 * ProductPage Component
 *
 * This component is responsible for displaying a table of products retrieved from the backend.
 * It utilizes the Table component for the table structure. The component fetches product data
 * using an asynchronous call to getProducts and handles potential errors.
 *
 * Functionality:
 * - Defines columns for the table, specifying the column ID, label, and minimum width
 * - Manages state for products data and error handling
 * - Fetches product data when the component mounts using useEffect, and updates state accordingly
 * - Dynamically creates rows for the table from the fetched products data
 * - Displays the table with products data and handles errors by displaying an error message if any
 *
 * Structure:
 * - The main component ProductPage encapsulates the entire functionality
 * - The return statement includes a header and the table wrapped in a div for styling
 * - Error messages are displayed in red color if there is an error during data fetching
 *
 * @returns {JSX.Element} A React component that displays a product page
 */

import React, { useEffect, useState } from 'react';
import '../index.css';
import StickyHeadTable, { createRow } from '../Component/Table';
import { getProducts } from '../apiService';
import Modal from '../Component/Modal';

export default function ProductPage() {
  // Create column names, id's, minimum width
  const columns = [
    { id: 'id', label: 'ID', minWidth: 40 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 100 },
    { id: 'active', label: 'Active', minWidth: 20 },
    { id: 'classification', label: 'Classification', minWidth: 100 },
    { id: 'type', label: 'Type', minWidth: 100 },
    { id: 'vendorId', label: 'Vendor ID', minWidth: 100 },
    { id: 'ingredientsList', label: 'Ingredients List', minWidth: 200 },
    { id: 'allergenList', label: 'Allergen List', minWidth: 160 },
    { id: 'cost', label: 'Cost', minWidth: 80 },
    { id: 'markup', label: 'Markup', minWidth: 80 },
    { id: 'salePrice', label: 'Sale Price', minWidth: 50 }
  ];

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Get all products from the database and store it in products array
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchProducts();
  }, []);

  // Formats a number as a price string in USD
  const formatPrice = (price) => `$${price.toFixed(2)}`;

  // Joins elements of an array into a single string separated by commas
  const formatList = (list) => list.join(', ');

  // Formats a number as a percentage string
  const formatPercentage = (value) => {
    return value > 0 ? `${(value * 100).toFixed(0)}%` : '';
  };

  // Returns an empty string if the given value is 0 or null
  const formatField = (value) => {
    if (value === 0 || value === null) {
      return '';
    }
    return value;
  };

  const rows = [];

  // Create rows from the product array
  products.map(
    (product) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      rows.push(
        createRow(columns, [
          product.id,
          product.name,
          product.description,
          <input type='checkbox' checked={product.active} />,
          product.classification,
          product.type,
          formatField(product.vendorId),
          formatList(product.ingredientsList),
          formatList(product.allergenList),
          formatPrice(product.cost),
          formatPercentage(product.markup),
          formatPrice(product.salePrice)
        ])
      )
    // eslint-disable-next-line function-paren-newline
  );

  // If there are less than 6 rows, create empty rows to fill out table
  while (rows.length < 6) {
    rows.push(createRow(columns, Array(columns.length).fill('')));
  }

  // Fields for placeholder modal
  const tempModalFields = [
    { id: 'name', label: 'Name' },
    { id: 'description', label: 'Description' },
    { id: 'active', label: 'Active' },
    { id: 'classification', label: 'Classification' },
    { id: 'type', label: 'Type' },
    { id: 'vendorId', label: 'Vendor ID' },
    { id: 'ingredientsList', label: 'Ingredients List' },
    { id: 'allergenList', label: 'Allergen List' },
    { id: 'cost', label: 'Cost' },
    { id: 'markup', label: 'Markup' },
    { id: 'salePrice', label: 'Sale Price' }
  ];

  // Added Modal as placeholder for New Product Form
  return (
    <div className='pages-table'>
      <div className='header-modal-container'>
        <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Products</h1>
        <Modal fields={tempModalFields} />
      </div>
      <StickyHeadTable columns={columns} rows={rows} />
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
}
