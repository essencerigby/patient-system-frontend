import React from 'react';
import ProductPage from './Product/ProductPage';

/**
 * App component serves as the main entry point for the application.
 *
 * @component
 * @returns {JSX.Element} A React component representing the main application.
 */
function App() {
  return (
    <div className='App'>
      <ProductPage />
    </div>
  );
}

export default App;
