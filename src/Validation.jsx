/* eslint-disable import/prefer-default-export */
// Errors should be named error.(fieldId) for reusability in the modal. Please see example below.
export const ingredientValidation = (formValues) => {
  const error = {};
  if (formValues.name.length < 1) {
    error.name = 'Must include a name';
  }
  if (formValues.name.length > 50) {
    error.name = 'Must be 50 characters or less.';
  }
  if (formValues.unitOfMeasure === '') {
    error.unitOfMeasure = 'Must choose one';
  }
  if (formValues.amount === '') {
    error.amount = 'Must include amount';
  }
  if (parseFloat(formValues.amount) <= 0) {
    error.amount = 'Must be greater than 0';
  }
  if (formValues.purchasingCost === '') {
    error.purchasingCost = 'Must include purchasing cost';
  }
  if (parseFloat(formValues.purchasingCost) <= 0) {
    error.purchasingCost = 'Must be greater than 0';
  }
  return error;
};
