/* eslint-disable import/prefer-default-export */
export const IngredientFields = [
  {
    id: 'active',
    label: 'Active:',
    required: false,
    type: 'checkbox'
  },
  {
    id: 'name',
    label: 'Ingredient Name',
    required: true
  },
  {
    id: 'purchasingCost',
    label: 'Purchasing Cost',
    min: 0.0,
    step: 0.01,
    required: true,
    type: 'number'
  },
  {
    id: 'amount',
    label: 'Unit Amount',
    required: true
  },
  {
    id: 'allergens',
    dropdownOptions: ['Dairy', 'Gluten', 'Nuts', 'Soy'],
    label: 'Allergens:',
    multiple: true,
    required: false,
    type: 'multiselect'
  },
  {
    id: 'unitOfMeasure',
    dropdownOptions: ['Baked Good', 'Drink'],
    label: 'Unit of Measure',
    required: true,
    type: 'dropdown'
  }
];
