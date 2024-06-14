/* eslint-disable import/prefer-default-export */
export const productFields = [
  {
    id: 'active',
    label: 'Active:',
    required: false,
    type: 'checkbox'
  },
  {
    id: 'name',
    label: 'Product Name',
    required: true
  },
  {
    id: 'description',
    label: 'Product Description',
    required: true,
    type: 'textarea'
  },
  {
    id: 'ingredientsList',
    label: 'Ingredients',
    required: false,
    type: 'textarea'
  },
  {
    id: 'allergenList',
    dropdownOptions: ['Dairy', 'Gluten', 'Nuts', 'Soy'],
    label: 'Allergens:',
    multiple: true,
    required: false,
    type: 'multiselect'
  },
  {
    id: 'classification',
    dropdownOptions: ['Baked Good', 'Drink'],
    label: 'Classification',
    required: true,
    type: 'dropdown'
  },
  {
    id: 'vendorId',
    label: 'Vendor ID',
    required: false
  },
  {
    id: 'cost',
    label: 'Cost',
    min: 0.0,
    step: 0.01,
    required: true,
    type: 'number'
  }
];
