/**
 * VendorPage Component
 *
 * This component is responsible for displaying a table of vendors retrieved from the backend.
 * It utilizes the Table component for the table structure. The component fetches vendor data
 * using an asynchronous call to getVendors and handles potential errors.
 *
 * Functionality:
 * - Defines columns for the table, specifying the column ID, label, and minimum width
 * - Manages state for vendors data and error handling
 * - Fetches vendor data when the component mounts using useEffect, and updates state accordingly
 * - Dynamically creates rows for the table from the fetched vendors data
 * - Displays the table with vendors data and handles errors by displaying an error message if any
 *
 * Structure:
 * - The main component VendorPage encapsulates the entire functionality
 * - The return statement includes a header and the table wrapped in a div for styling
 * - Error messages are displayed in red color if there is an error during data fetching
 *
 * @returns {JSX.Element} A React component that displays a vendor page
 */

import React, { useEffect, useState } from 'react';
import '../index.css';
import StickyHeadTable, { createRow } from '../Component/Table';
import { getVendors } from '../apiService';
import Modal from '../Component/Modal';

export default function VendorPage() {
  // Create column names, id's, minimum width
  const columns = [
    { id: 'id', label: 'ID', minWidth: 40 },
    { id: 'vendorName', label: 'Vendor Name', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 100 },
    { id: 'contact', label: 'Contact', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'phone number', label: 'Phone Number', minWidth: 100 },
    { id: 'role', label: 'Role', minWidth: 100 }
  ];

  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState(null);

  // Get all vendors from the database and store it in vendors array
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const data = await getVendors();
        setVendors(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchVendors();
  }, []);

  const rows = [];

  // Create rows from the vendor array
  vendors.map(
    (vendor) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      rows.push(
        createRow(columns, [
          vendor.id,
          vendor.name,
          vendor.address.street,
          vendor.contact.contactName,
          vendor.contact.email,
          vendor.contact.phone,
          vendor.contact.titleOrRole
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
    { id: 'vendorName', label: 'Vendor Name' },
    { id: 'streetAddress1', label: 'Street Address 1' },
    { id: 'streetAddress2', label: 'Street Address 2' },
    { id: 'city', label: 'City' },
    { id: 'state', label: 'State' },
    { id: 'zipCode', label: 'Zip Code' },
    { id: 'contact', label: 'Contact' },
    { id: 'email', label: 'Email' },
    { id: 'phoneNumber', label: 'Phone Number' },
    { id: 'role', label: 'Role' }
  ];

  // Added Modal on line 62 as placeholder for New Vendor Form
  return (
    <div className='pages-table'>
      <div className='header-modal-container'>
        <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Vendors</h1>
        <Modal fields={tempModalFields} />
      </div>
      <StickyHeadTable columns={columns} rows={rows} />
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
}
