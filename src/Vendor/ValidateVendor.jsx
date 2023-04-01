/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */

/* Vendor validations for each field and the error messages */
export function validateVendor(vendor) {
  const errors = {};

  if (!vendor.name || vendor.name.length >= 50) {
    errors.name = 'Please enter a name shorter than 50 characters';
  }
  if (!vendor.street) {
    errors.street = 'Street field is empty';
  }
  if (!vendor.city) {
    errors.city = 'City field is empty';
  }
  if (!vendor.state) {
    errors.state = 'Please select a state';
  }
  if (!vendor.zipCode || !/^\d{5}$/.test(vendor.zipCode)) {
    errors.zipCode = 'Zip code must be 5 numerical digits';
  }
  if (!vendor.email || !/^[^@]+@[^@]+\.[^@]+$/.test(vendor.email)) {
    errors.email = 'The email is not in the right format: x@x.x';
  }
  if (!vendor.contactName || !/^[a-zA-Z'-]+\s[a-zA-Z'-]+$/.test(vendor.contactName)) {
    errors.contactName = 'Must have a first and last name separated by a space. Alphabetic characters only';
  }
  if (!vendor.phone || !/^\(?\d{3}\)?[-]?\d{3}[-]?\d{4}$/.test(vendor.phone)) {
    errors.phone = 'Please enter a valid phone number in the format: 999-999-9999 or 9999999999';
  }
  if (!vendor.titleOrRole) {
    errors.titleOrRole = 'Title/Role field is empty';
  }

  return errors;
}
