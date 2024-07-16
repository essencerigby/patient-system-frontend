/* Patient validations for each field and the error messages */
export default function ValidatePatient(patient) {
  const errors = {};

  if (!patient.firstName || patient.firstName.length >= 30) {
    errors.firstName = 'Please enter a first name between 1-30 characters';
  }
  if (!patient.lastName || patient.lastName.length >= 30) {
    errors.lastName = 'Please enter a last name between 1-30 characters';
  }
  if (!patient.email || !/^[^@]+@[^@]+\.[^@]+$/.test(patient.email)) {
    errors.email = 'Please enter email in x@x.x format';
  }
  if (!patient.ssn || !/^\d{3}-\d{2}-\d{4}$/.test(patient.ssn)) {
    errors.ssn = 'Please enter ssn in DDD-DD-DDDD format';
  }
  if (!patient.street) {
    errors.street = 'Street field is empty';
  }
  if (!patient.city) {
    errors.city = 'City field is empty';
  }
  if (!patient.state) {
    errors.state = 'Please select a state';
  }
  if (!patient.zip || !/^\d{5}$/.test(patient.zip)) {
    errors.zip = 'Zip code must be 5 numerical digits';
  }
  if (!patient.age) {
    errors.age = 'Age field is empty';
  }
  if (!patient.height) {
    errors.height = 'Height field is empty';
  }
  if (!patient.weight) {
    errors.weight = 'Weight field is empty';
  }
  if (!patient.gender) {
    errors.gender = 'Gender field is empty';
  }
  if (!patient.insurance) {
    errors.insurance = 'Insurance field is empty';
  }

  return errors;
}
