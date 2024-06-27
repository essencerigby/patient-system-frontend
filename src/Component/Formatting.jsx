/* eslint-disable import/prefer-default-export */
// Perform any necessary formatting before object is passed for a POST/PUT Request
export const ingredientFormatting = (formValues) => {
  let filteredAllergenList = [];
  if (formValues.allergens) {
    filteredAllergenList = formValues.allergens.filter((allergen) => allergen !== '');
  }
  const ingredientJson = {
    ...formValues,
    allergens: filteredAllergenList
  };
  return ingredientJson;
};
