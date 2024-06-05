import React from 'react';
import Modal from './Component/Modal';
import StickyHeadTable, { createRow } from './Component/Table';

const columns = [
  { id: 'id', label: 'ID', minWidth: 40 },
  { id: 'vendorName', label: 'Vendor Name', minWidth: 100 },
  { id: 'address', label: 'Address', minWidth: 100 },
  { id: 'contact', label: 'Contact', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'phone number', label: 'Phone Number', minWidth: 100 },
  { id: 'role', label: 'Role', minWidth: 100 }
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

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Modal />
        <StickyHeadTable columns={columns} rows={rows} />
      </header>
    </div>
  );
}

export default App;
