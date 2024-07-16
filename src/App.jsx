/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import React from 'react';
import {
  BrowserRouter as Router, Route, Navigate,
  Routes
} from 'react-router-dom';
import ReservationPage from './Reservation/ReservationPage';

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
          <Route path='/patients' element={<ReservationPage />} />
          <Route path='/' element={<Navigate to='/patients' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
