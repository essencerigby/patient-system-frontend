/* eslint-disable import/prefer-default-export */

/*
 * The ingredientValidation function validates the form values for an ingredient.
 * It checks the following conditions and adds corresponding error messages to the error object:
 * - 'name' must not be empty and must be 50 characters or less.
 * - 'unitOfMeasure' must be selected.
 * - 'amount' must not be empty and must be greater than 0.
 * - 'purchasingCost' must not be empty and must be greater than 0.
 * Errors are stored in the error object with keys corresponding to the form field names.
 */
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
