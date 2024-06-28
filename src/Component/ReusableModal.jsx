/* eslint-disable max-len */
/* eslint-disable object-curly-newline */

/*
 * This file defines a Modal component using React that can be used for creating and
 * editing objects. It handles dynamic form rendering, input validation, and form submission.
 * The modal adjusts its width based on the window size and provides different input types
 * including text, checkbox, and multi-select. The component uses Material-UI for styling and
 * includes custom CSS for additional styles.
 */
import { React, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import './Modal.css';
import ReusableForm from './ReusableForm';

/**
 * Modal component for creating and editing objects.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.fields - The fields to be displayed in the form.
 * @param {Object} [props.object] - The object to be edited. If not provided, the modal will be used for creating a new object.
 * @param {string} props.header - The header text for the modal.
 * @param {Object} props.dropDownOptions - The options for dropdown fields.
 * @param {Object} props.multiSelectOptions - The options for multi-select fields.
 * @param {Function} props.onRefresh - Callback function to refresh the parent component (Table).
 * @param {Function} props.createObject - Function to create a new object. References apiService file.
 * @param {Function} props.getObjectById - Function to get an object by its ID. References apiService file.
 * @param {Function} props.editObject - Function to edit an existing object. References apiService file.
 * @param {Function} props.validation - Function to validate form inputs.
 * @param {Function} props.format - Function to format form values before POST/PUT Request.
 * @param {Object} props.style - Custom styles for the form.
 */
export default function Modal({
  fields,
  object,
  header,
  dropDownOptions,
  multiSelectOptions,
  onRefresh,
  createObject,
  getObjectById,
  editObject,
  validation,
  format,
  style
}) {
  const [modal, setModal] = useState(false);
  const [modalWidth, setModalWidth] = useState(Math.min(window.innerWidth * 0.8, 600));
  const [errors, setErrors] = useState({});

  /**
   * Initializes form values based on the provided fields.
   *
   * @returns {Object} - An object with initialized form values.
   */
  const initializedValues = () => {
    const initialValues = {};
    fields.forEach((field) => {
      initialValues[field.id] = '';
    });
    return initialValues;
  };

  const [formValues, setFormValues] = useState(initializedValues);

  /**
   * Updates the modal width based on the window size.
   */
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
   * Handles changes in the form inputs and updates the form values state.
   *
   * @param {Event} e - The event triggered by changing an input value.
   */
  const handleChange = (e) => {
    const { id, type, value, checked, options } = e.target;
    if (type === 'checkbox') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: checked
      }));
    } else if (type === 'select-multiple') {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: selectedValues
      }));
    } else if (type === 'numericInput' || type === 'numericInputDollar') {
      let numericValue = value.replace(/[^0-9.]/g, '');

      if (numericValue.split('.').length > 2) {
        numericValue = numericValue.replace(/\.+$/, '');
      }

      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: numericValue
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: value
      }));
    }
  };

  /**
   * Handles form submission, performs validation, and calls the appropriate function to create or edit an object.
   */
  const handleSubmit = async () => {
    const currentErrors = validation(formValues);
    setErrors(currentErrors);
    if (Object.keys(currentErrors).length === 0) {
      const jsonReadyObject = format(formValues);
      if (object) {
        try {
          await editObject(jsonReadyObject);
          setErrors({});
          toggleModal();
          onRefresh();
          setFormValues(initializedValues);
        } catch (err) {
          setErrors(err.response ? err.response.data : err.message);
        }
      } else {
        try {
          await createObject(jsonReadyObject);
          setErrors({});
          toggleModal();
          onRefresh();
          setFormValues(initializedValues);
        } catch (err) {
          setErrors(err.response ? err.response.data : err.message);
        }
      }
    }
  };

  /**
   * Handles the cancel action, resetting form values and hiding the modal.
   */
  const handleCancel = () => {
    setFormValues(initializedValues);
    setErrors({});
    toggleModal();
  };

  // Apply CSS class to body to control modal overlay visibility
  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  /**
   * Handles the action of getting an object by id to then edit it.
   *
   * @param {string} id - The ID of the object to be edited.
   */
  const handleEditObject = async (id) => {
    const currentObject = await getObjectById(id);
    setFormValues(currentObject);
    toggleModal();
  };

  return (
    <>
      {/* If there is no object passed as a prop, the Add New Button will render */}
      {!object && (
        <button type='button' onClick={toggleModal} className='btn-modal'>
          <strong>Add New +</strong>
        </button>
      )}
      {/* If an object is passed as a prop (Ex: object={vendor}), the edit icon will render along with the id.
      This makes the modal reusable for edit functionality */}
      {object && (
        <div className='edit-container'>
          <EditIcon className='edit-icon' fontSize='small' onClick={() => handleEditObject(object.id)} />
          <div className='id-number'>{object.id}</div>
        </div>
      )}
      {modal && (
        <div className='modal'>
          <div className='overlay' />
          <div className='modal-content' style={{ maxWidth: modalWidth }}>
            <div className='modal-header'>
              <h2>{header}</h2>
            </div>
            <ReusableForm
              fields={fields}
              dropDownOptions={dropDownOptions}
              multiSelectOptions={multiSelectOptions}
              onSubmit={handleSubmit}
              onChange={handleChange}
              object={formValues}
              error={errors}
              style={style}
            />
            <div className='btn-container'>
              <button type='button' className='close-modal' onClick={handleCancel}>
                Cancel
              </button>
              <button type='button' className='submit-close-modal' onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
