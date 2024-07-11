/**
 * reservation Page Component
 *
 * This component displays a table of reservations retrieved from the backend/database.
 * It utilizes the Table component for the table structure.The component fetches reservation data
 * using an asynchronous call to getreservations and handles potential errors.
 *
 * Functionality:
 * - Defines columns for the table, specifying the column ID, label, and minimum width.
 * - Manages state for reservations data and error handling.
 * - Fetches reservation data when the component mounts using useEffect, and updates
 state accordingly.
 * - Dynamically creates rows for the table from the fetched reservations data.
 * - Displays the table with reservations data
 * - Handles errors by displaying an error message if any.
 *
 * Structure:
 * - The main component reservationPage encapsulates the entire functionality.
 * - The return statement includes a header and the table wrapped in a div for styling.
 * - Error messages are displayed in red color if there is an error during data fetching.
 *
 * @returns {JSX.Element} A React component that displays a reservation page.
 */

/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable function-paren-newline */

import React, { useEffect, useState } from 'react';
import StickyHeadTable, { createRow } from '../Component/Table';
import UpdateReservationModal from './UpdateReservationModal';
import NewReservationModal from './CreateReservationModal';
import { getAllReservations } from '../apiService';
import DeleteReservation from './DeleteReservation';
import SuccessModal from '../Component/SuccessModal';
import TableFilter from '../Component/TableFilter';

export default function ReservationPage() {
  const columns = [
    { id: 'id', label: 'ID', minWidth: 40 },
    { id: 'guestEmail', label: 'Guest Email', minWidth: 100 },
    { id: 'checkInDate', label: 'Check-in Date', minWidth: 40 },
    { id: 'numberOfNights', label: 'Number Of Nights', minWidth: 40 },
    { id: 'deleteIcon', minWidth: 20 }
  ];

  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  function formatDate(dateString) {
    const dateParts = dateString.split('-'); // Split the date by the hyphen
    const formattedDate = `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`; // Rearrange the parts
    return formattedDate;
  }

  // Get all reservations from the database and store it in reservations array
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getAllReservations();
        data.sort((a, b) => (a.id > b.id ? 1 : -1));
        const formattedData = data.map((reservation) => ({
          ...reservation,
          checkInDate: formatDate(reservation.checkInDate)
        }));
        setReservations(formattedData);
      } catch (err) {
        setError(err);
      }
    };

    fetchReservations();
  }, [refresh]);

  // Trigger a refresh when needed.
  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  // Toggle the visibility of the success modal
  const handleSuccessModal = () => {
    if (successModal) {
      setError(null);
    }
    setSuccessModal(!successModal);
  };

  const rows = [];

  // Create rows from the reservation array
  reservations.map((reservation) =>
    rows.push(
      createRow(
        columns,
        [
          <UpdateReservationModal reservation={reservation} onRefresh={handleRefresh} />,
          reservation.guestEmail,
          reservation.checkInDate,
          reservation.numberOfNights,
          <DeleteReservation reservation={reservation} onRefresh={handleRefresh} toggleSuccessModal={handleSuccessModal} />
        ],
        reservation.id
      )
    )
  );

  // If there are less than 6 rows, create empty rows to fill out table
  while (rows.length < 6) {
    rows.push(createRow(columns, Array(columns.length).fill('')));
  }

  const fields = [
    {
      id: 'guestEmail', label: 'Email', keys: 'guestEmail', required: true
    },
    {
      id: 'checkInDate',
      label: 'Check-in Date',
      keys: 'checkInDate',
      type: 'date'
    },
    { id: 'numberOfNights', label: 'Number of Nights', keys: 'numberOfNights' }
  ];

  return (
    <>
      <div className='pages-table'>
        <div className='header-modal-container'>
          <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Reservations</h1>
          <NewReservationModal onRefresh={handleRefresh} />
        </div>
        <StickyHeadTable id='reservations' columns={columns} rows={rows} />
        <TableFilter
          fields={fields}
          getDomain={getAllReservations}
          setDomain={setReservations}
          setError={setError}
          onRefresh={handleRefresh}
        />
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      </div>
      {successModal && <SuccessModal message='Reservation was successfully deleted!' onClose={handleSuccessModal} />}
    </>
  );
}
