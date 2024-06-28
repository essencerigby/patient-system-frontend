/* eslint-disable import/prefer-default-export */
// Errors should be named error.(fieldId) for reusability in the modal. Please see example below.
export const ingredientValidation = (formValues) => {
  const error = {};
  if (formValues.name.length < 1) {
    error.name = 'Must have a name';
  }
  return error;
};
