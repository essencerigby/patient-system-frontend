/* eslint-disable max-len */
/* eslint-disable react/jsx-tag-spacing */
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
import '../Component/Modal.css';
import StickyHeadTable, { createRow } from '../Component/Table';
import { getProducts } from '../apiService';
import { productFields } from './ProductFields';
import ProductModal from './ProductModal';
import DeleteProductModal from './DeleteProductModal';
import EditProductModal from './EditProductModal';

export default function ProductPage() {
  // Create column names, id's, minimum width
  const columns = [
    { id: 'id', label: 'ID', minWidth: 80 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 100 },
    { id: 'active', label: 'Active', minWidth: 20 },
    { id: 'classification', label: 'Classification', minWidth: 100 },
    { id: 'type', label: 'Type', minWidth: 100 },
    { id: 'vendorId', label: 'Vendor ID', minWidth: 120 },
    { id: 'ingredientsList', label: 'Ingredients List', minWidth: 200 },
    { id: 'allergenList', label: 'Allergen List', minWidth: 160 },
    { id: 'cost', label: 'Cost', minWidth: 80 },
    { id: 'markup', label: 'Markup', minWidth: 80 },
    { id: 'salePrice', label: 'Sale Price', minWidth: 120 },
    { id: 'deleteIcon', label: '', minWidth: 20 }
  ];

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // Get all products from the database and store it in products array
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        data.sort((a, b) => (a.id > b.id ? 1 : -1));
        setProducts(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchProducts();
  }, [refresh]);

  // Formats a number as a price string in USD
  const formatPrice = (price) => `$${price}`;

  // Joins elements of an array into a single string separated by commas
  const formatList = (list) => list.join(', ');

  // Formats a number as a percentage string
  const formatPercentage = (value) => {
    return `${value}%`;
  };

  const displayDash = (value) => {
    return value === '' || value.toLowerCase() === 'n/a' ? '-' : value;
  };

  // Toggles the refresh state, to trigger a refresh when a new vendor is successfully submitted.
  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  const rows = [];

  // Create rows from the product array
  products.map(
    (product) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      rows.push(
        createRow(
          columns,
          [
            <EditProductModal product={product} fields={productFields} onRefresh={handleRefresh} />,
            product.name,
            product.description,
            <input type='checkbox' checked={product.active} onChange={() => {}} disabled />,
            product.classification,
            displayDash(product.type),
            displayDash(product.vendorId),
            formatList(product.ingredientsList),
            displayDash(formatList(product.allergenList)),
            formatPrice(product.cost),
            displayDash(`${product.markup === 'n/a' ? product.markup : formatPercentage(product.markup)}`),
            formatPrice(product.salePrice),
            <DeleteProductModal product={product} onRefresh={handleRefresh} />
          ],
          product.id
        )
      )
    // eslint-disable-next-line function-paren-newline
  );

  // If there are less than 6 rows, create empty rows to fill out table
  while (rows.length < 6) {
    rows.push(createRow(columns, Array(columns.length).fill('')));
  }

  // Displaying ProductModal which shows NewProductForm
  return (
    <div className='pages-table'>
      <div className='header-modal-container'>
        <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Products</h1>
        <ProductModal fields={productFields} onRefresh={handleRefresh} />
      </div>
      <StickyHeadTable columns={columns} rows={rows} />
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
}
