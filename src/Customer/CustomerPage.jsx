import React from 'react';
import StickyHeadTable, { createRow } from '../Component/Table';
import Modal from '../Component/Modal';

export default function CustomerPage() {
  const columns = [
    { id: 'id', label: 'ID', minWidth: 40 },
    { id: 'active', label: 'Active', minWidth: 40 },
    { id: 'name', label: 'Customer Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'lifetimeSpent', label: 'Lifetime spent', minWidth: 100 },
    { id: 'cutomerSince', label: 'Customer since', minWidth: 100 }
  ];

  // Iterate through the columns and apply the max width conditionally
  // To be used with label/id = "id" or "ID"
  const updatedColumns = columns.map((column) => {
    const maxWidth = 40;

    if (column.id.toLowerCase() === 'id' || column.label.toLowerCase() === 'id') {
      return {
        ...column,
        maxWidth
      };
    }
    return column;
  });

  // Construction/storage of test data in rows array
  const rows = [
    createRow(updatedColumns, [
      '1',
      'The Flash',
      '1125 Locust St, Central City, MI 64801',
      'Barry Allen',
      'bartholomew.a@dccomics.com',
      '123-456-7890',
      'Sales Associate'
    ]),
    createRow(updatedColumns, [
      '2',
      'Fast and Furry-ous',
      '4000 Warner Blvd, Termite Terrace, Los Angeles, CA 91522',
      'Road Runner',
      'beepbeep@looney.com',
      '123-456-7890',
      'Sales Manager'
    ]),
    createRow(updatedColumns, [
      '3',
      'Flo Joe',
      '123 Main St, Apt 101, Springfield, IL 62701',
      'Florence Griffith-Joyner',
      'flogotthejoe@olympic.com',
      '122-119-5992',
      'Sales Manager'
    ]),
    createRow(updatedColumns, [
      '4',
      'Sega',
      '123 Christmas Island, Apt 101, Irvine, CA 91502',
      'Sonic The Hedgehog',
      'theHedgehog@sonic.com',
      '123-456-7890',
      'Sales Manager'
    ]),
    createRow(updatedColumns, [
      '5',
      'Bolted',
      'Sherwood St, Jamaica Queens, NY 11433',
      'Usain Bolt',
      'fastestman@olympics.com',
      '987-654-3210',
      'Sales Manager'
    ])
  ];
  // Define vendorModal fields - able to be modified
  const temporaryFields = [
    { id: 'id', label: 'ID' },
    { id: 'active', label: 'Active' },
    { id: 'name', label: 'Customer Name' },
    { id: 'email', label: 'Email' },
    { id: 'lifetimeSpent', label: 'Lifetime spent' },
    { id: 'cutomerSince', label: 'Customer since' }
  ];

  return (
    <div className='pages-table'>
      <div className='header-modal-container'>
        <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Customers</h1>
        <Modal fields={temporaryFields} />
      </div>
      <StickyHeadTable columns={columns} rows={rows} />;
    </div>
  );
}
