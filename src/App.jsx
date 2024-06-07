import React from 'react';
import VendorPage from './Vendor/VendorPage';

/**
 * App component serves as the main entry point for the application.
 *
 * @component
 * @returns {JSX.Element} A React component representing the main application.
 */
function App() {
  return (
    <div className='App'>
      <VendorPage />
    </div>
  );
}

export default App;
