import { React, useEffect, useState } from 'react';
import './Modal.css';
import Form from './Form';

/**
 * Modal component renders a modal dialog for adding new vendors.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array} props.fields - Fields configuration for the form.
 * @returns {JSX.Element} A React component representing a modal dialog.
 */
export default function Modal({ fields }) {
  // State to manage the visibility of the modal
  const [modal, setModal] = useState(false);
  const [modalWidth, setModalWidth] = useState(Math.min(window.innerWidth * 0.8, 600));

  useEffect(() => {
    const handleResize = () => {
      setModalWidth(Math.min(window.innerWidth * 0.8, 600));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /**
   * Toggles the visibility of the modal.
   */
  const toggleModal = () => {
    setModal(!modal);
  };

  /**
   * Handles form submission.
   */
  const handleSubmit = () => {
    toggleModal();
  };

  // Apply CSS class to body to control modal overlay visibility
  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      {/* Button to toggle the modal */}
      <button type='button' onClick={toggleModal} className='btn-modal'>
        <strong>Add New +</strong>
      </button>

      {/* Render the modal content if modal is active */}
      {modal && (
        <div className='modal'>
          <div className='overlay' />
          <div className='modal-content' style={{ maxWidth: modalWidth }}>
            <div className='modal-header'>
              <h2>NEW VENDOR FORM</h2>
            </div>
            {/* Render the form component */}
            <Form fields={fields} />
            <div className='btn-container'>
              {/* Button to cancel modal */}
              <button type='button' className='close-modal' onClick={handleSubmit}>
                Cancel
              </button>
              {/* Button to submit form and close modal */}
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
