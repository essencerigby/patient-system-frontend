/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './Modal.css';

// reusable success modal to display any message through props.
export default function SuccessModal({ message, onClose }) {
  return (
    <div className='success-modal'>
      <div className='success-modal-content'>
        <div className='success-modal-header'>
          <p>{message}</p>
        </div>
        <div className='success-modal-body'>
          <button
            type='button'
            className='close-success-modal'
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
