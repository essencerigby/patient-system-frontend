import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from './Product/ProductPage';
import VendorPage from './Vendor/VendorPage';
import ResponsiveAppBar from './Component/Header';
import CustomerPage from './Customer/CustomerPage';

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
          <Route path='/vendors' element={<VendorPage />} />
          <Route path='/customers' element={<CustomerPage />} />
          <Route path='/products' element={<ProductPage />} />
          {/* <Route path='/promotions' element={<Promotions />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
