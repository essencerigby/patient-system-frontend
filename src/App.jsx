/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import React from 'react';
import {
  BrowserRouter as Router, Route, Navigate,
  Routes
} from 'react-router-dom';
import PatientsPage from './Patient/PatientsPage';
import PatientDetails from './Patient/PatientDetailsPage';

/**
 * App component serves as the main entry point for the application.
 *
 * @component
 * @returns {JSX.Element} A React component representing the main
 * application with links to Vendor, Customer, Product, and Promotions pages.
 */

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/patients' element={<PatientsPage />} />
          <Route path='/' element={<Navigate to='/patients' />} />
          <Route path='/patients/:id' element={<PatientDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
