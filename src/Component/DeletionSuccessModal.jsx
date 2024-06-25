import { React } from 'react';

export default function DeleteProductModal({ domain, onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className='modal'>
      <div className='overlay' />
      <div className='delete-modal-content' style={{ maxWidth: '390px' }}>
        <div className='delete-modal-header'>
          <h2>{domain} was deleted successfully </h2>
        </div>
        <div className='delete-btn-container'>
          <button type='button' className='submit-close-modal' onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
