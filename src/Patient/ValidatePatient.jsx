/* Patient validations for each field and the error messages */
export default function ValidatePatient(patient) {
  const errors = {};

  if (!patient.firstName || !patient.firstName.trim()) {
    errors.firstName = 'First Name is empty';
  } else if (patient.firstName.length > 30) {
    errors.firstName = 'Please enter a first name between 1-30 characters';
  } else if (!/^[A-Za-z\s\-',.]*$/.test(patient.firstName)) {
    errors.firstName = 'First Name contains invalid chracters';
  }

  if (!patient.lastName || !patient.lastName.trim()) {
    errors.lastName = 'Last Name is empty';
  } else if (patient.lastName.length > 30) {
    errors.lastName = 'Please enter a last name between 1-30 characters';
  } else if (!/^[A-Za-z\s\-',.]*$/.test(patient.lastName)) {
    errors.lastName = 'Last Name contains invalid chracters';
  }

  if (!patient.email || !/^[^@]+@[^@]+\.[^@]+$/.test(patient.email)) {
    errors.email = 'Please enter email in x@x.x format';
  } else if (patient.email.length > 50) {
    errors.email = 'Email must be less than 50 characters';
  }

  if (!patient.ssn || !/^\d{3}-\d{2}-\d{4}$/.test(patient.ssn)) {
    errors.ssn = 'Please enter ssn in DDD-DD-DDDD format';
  }

  if (!patient.street || !patient.street.trim()) {
    errors.street = 'Street field is empty';
  } else if (!/^[A-Za-z0-9\s\-',.]*$/.test(patient.street)) {
    errors.street = 'Street contains invalid characters';
  } else if (patient.street.length > 30) {
    errors.street = 'Street must be less than 30 characters';
  }

  if (!patient.city || !patient.city.trim()) {
    errors.city = 'City field is empty';
  } else if (!/^[A-Za-z\s\-',.]*$/.test(patient.city)) {
    errors.city = 'City contains invalid characters';
  } else if (patient.city.length > 30) {
    errors.city = 'City must be less than 30 characters';
  }

  if (!patient.state) {
    errors.state = 'Please select a state';
  }

  if (!/^\d{5}(-\d{4})?$/.test(patient.zip)) {
    errors.zip = 'Zip code must be in DDDDD or DDDDD-DDDD';
  } else if (!patient.zip) {
    errors.zip = 'Zip code field is empty';
  }

  if (!patient.age || !patient.age.toString().trim() === '') {
    errors.age = 'Age field is empty';
  } else if (!/^(120|1[01][0-9]|[1-9]?[0-9])$/.test(patient.age)) {
    errors.age = 'Age must be between 0 and 120 years';
  }

  if (patient.height < 0) {
    errors.height = 'Height must be a whole number greater than 0';
  } else if (patient.height > 108) {
    errors.height = 'Height must be a whole number less than 108';
  }

  if (patient.weight < 0) {
    errors.weight = 'Weight must be a whole number greater than 0';
  } else if (patient.weight > 1400) {
    errors.weight = 'Weight must be a whole number less than 1400';
  }

  if (!patient.gender) {
    errors.gender = 'Gender field is empty';
  }

  if (!patient.insurance || !patient.insurance.trim()) {
    errors.insurance = 'Insurance field is empty';
  } else if (patient.insurance.length > 50) {
    errors.insurance = 'Insurance must be less that 50 characters';
  } else if (!/^[A-Za-z\s\-',.]*$/.test(patient.insurance)) {
    errors.insurance = 'Insurance contains invalid characters';
  }

  return errors;
}
