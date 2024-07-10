/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ProductPage from './Product/ProductPage';
// import VendorPage from './Vendor/VendorPage';
import ResponsiveAppBar from './Component/Header';
import ReservationPage from './Reservation/ReservationPage';
// import IngredientPage from './Ingredient/IngredientPage';

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
        <ResponsiveAppBar />
        <Routes>
          {/* <Route path='/vendors' element={<VendorPage />} /> */}
          <Route path='/reservations' element={<ReservationPage />} />
          {/* <Route path='/products' element={<ProductPage />} /> */}
          {/* <Route path='/ingredients' element={<IngredientPage />} /> */}
          {/* <Route path='/promotions' element={<Promotions />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
