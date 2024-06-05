import { React, useState } from 'react';
import './Modal.css';
import Form from './Form';

export default function Modal() {
  const [modal, setModal] = useState(false);

  // Renders modal active for application of return function
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = () => {
    toggleModal();
  };

  // active-modal class renders overlay as hidden
  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      <button type='button' onClick={toggleModal} className='btn-modal'>
        <strong>Add New +</strong>
      </button>

      {/* Short-circuit check for modal in active state */}
      {modal && (
        <div className='modal'>
          <div className='overlay' />
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>NEW VENDOR FORM</h2>
            </div>
            <Form />
            <div className='btn-container'>
              <button type='button' className='close-modal' onClick={handleSubmit}>
                Cancel
              </button>
              <button type='button' className='submit-close-modal' onClick={toggleModal}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
