/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const vendorsApiUrl = 'http://localhost:8085/vendors';
const productsApiUrl = 'http://localhost:8085/products';
const customersApiUrl = 'http://localhost:8085/customers';

// Retrieving vendor instance(s) from the backend
export const getVendors = async () => {
  try {
    const response = await axios.get(vendorsApiUrl);
    return response.data;
  } catch (error) {
    throw Error('Error fetching vendors', error);
  }
};

export const getVendorById = async (id) => {
  try {
    const response = await axios.get(`${vendorsApiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw Error('Error fetching vendor', error);
  }
};

// This function is responsible for creating a new vendor by sending a POST request
// to the specified API endpoint (vendorsApiUrl) with the vendor data provided as an argument.
export const createVendor = async (vendorToCreate) => {
  const response = await axios.post(vendorsApiUrl, vendorToCreate);
  return response.data;
};

export const editVendor = async (vendorToEdit) => {
  try {
    const response = await axios.put(`${vendorsApiUrl}/${vendorToEdit.id}`, vendorToEdit);
    return response.data;
  } catch (error) {
    throw Error('Error updating vendor', error);
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(productsApiUrl);
    return response.data;
  } catch (error) {
    throw Error('Could not fetch products', error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${productsApiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw Error('Could not fetch product', error);
  }
};

/**
 * Fetches customer data from the backend.
 *
 * This asynchronous function makes a GET request to the provided API URL to retrieve
 * customer data. If the request is successful, it returns the customer data. In case
 * of an error during the fetch operation, it throws an error with a descriptive message.
 *
 */
export const getCustomers = async () => {
  try {
    const response = await axios.get(customersApiUrl);
    return response.data;
  } catch (error) {
    throw Error('Error fetching customers', error);
  }
};