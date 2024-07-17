/* eslint-disable function-paren-newline */
/**
 * patientPage Component
 *
 * This component is responsible for displaying a table of patients retrieved from the backend.
 * It utilizes the Table component for the table structure. The component fetches patient data
 * using an asynchronous call to getpatients and handles potential errors.
 *
 * Functionality:
 * - Defines columns for the table, specifying the column ID, label, and minimum width
 * - Manages state for patients data and error handling
 * - Fetches patient data when the component mounts using useEffect, and updates state accordingly
 * - Dynamically creates rows for the table from the fetched patients data
 * - Displays the table with patients data and handles errors by displaying an error message if any
 *
 * Structure:
 * - The main component patientPage encapsulates the entire functionality
 * - The return statement includes a header and the table wrapped in a div for styling
 * - Error messages are displayed in red color if there is an error during data fetching
 *
 * @returns {JSX.Element} A React component that displays a patient page
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import '../index.css';
import StickyHeadTable, { createRow } from '../Component/Table';
import { getPatients } from '../apiService';
import CreatePatient from './CreatePatient';
import UpdatePatient from './UpdatePatient';
import DeletePatient from './DeletePatient';
import SuccessModal from '../Component/SuccessModal';
import TableFilter from '../Component/TableFilter';

export default function PatientPage() {
  // Create column names, id's, minimum width
  const columns = [
    { id: 'editIcon', label: '', minWidth: 30 },
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    { id: 'lastName', label: 'Last Name', minWidth: 100 },
    { id: 'age', label: 'Age', minWidth: 50 },
    { id: 'gender', label: 'Gender', minWidth: 50 },
    { id: 'deleteIcon', label: '', minWidth: 30 },
    { id: 'viewDetails', label: '', minWidth: 30 }
  ];

  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  // Get all patients from the database and store it in patients array
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        // Sort patients by ID in ascending order
        data.sort((a, b) => (a.id > b.id ? 1 : -1));
        setPatients(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchPatients();
  }, [refresh]);

  // Toggles the refresh state, to trigger a refresh when a new patient is successfully submitted.
  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  // toggles success modal and refreshes to handle delete
  const handleDeleteSuccess = () => {
    setShowSuccessModal(true);
    handleRefresh();
  };

  // closes success modal
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const rows = [];

  // Create rows from the patient array
  patients.map((patient) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    rows.push(
      createRow(
        columns,
        [
          <UpdatePatient id='editIcon' patient={patient} onRefresh={handleRefresh} />,
          patient.firstName,
          patient.lastName,
          patient.age,
          patient.gender,
          <DeletePatient id='deleteIcon' patientId={patient.id} onDeleteSuccess={handleDeleteSuccess} />,
          <ListAltOutlinedIcon
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/patients/${patient.id}`)}
          />
        ],
        patient.id
      )
    )
  );

  const temporaryFields = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Name', keys: 'name' },
    { id: 'age', label: 'Age', keys: 'age' },
    { id: 'gender', label: 'Gender', keys: 'gender' }
  ];

  return (
    <div className='pages-table'>
      <div className='header-modal-container'>
        <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Patients</h1>
        <CreatePatient onRefresh={handleRefresh} />
      </div>
      {showSuccessModal && (
        <SuccessModal message='Patient was successfully deleted!' onClose={closeSuccessModal} />
      )}
      <StickyHeadTable columns={columns} rows={rows} />
      <TableFilter
        fields={temporaryFields}
        getDomain={getPatients}
        setDomain={setPatients}
        setError={setError}
        onRefresh={handleRefresh}
      />
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
}
