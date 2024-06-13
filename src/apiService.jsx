/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const vendorsApiUrl = 'http://localhost:8085/vendors';
const productsApiUrl = 'http://localhost:8085/products';

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
