/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const vendorsApiUrl = 'http://localhost:8085/vendors';
const productsApiUrl = 'http://localhost:8085/products';
const reservationsApiUrl = 'http://localhost:8085/reservations';
const ingredientsApiUrl = 'http://localhost:8085/ingredients';

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

export const deleteVendorById = async (vendorId) => {
  try {
    const response = await axios.delete(`${vendorsApiUrl}/${vendorId}`);
    return response.data;
  } catch (error) {
    throw Error('Error deleting vendor', error);
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

export const editProduct = async (productToEdit) => {
  try {
    const response = await axios.put(`${productsApiUrl}/${productToEdit.id}`, productToEdit);
    return response.data;
  } catch (error) {
    throw Error('Error updating vendor', error);
  }
};

export const deleteProduct = async (productToDelete) => {
  try {
    const response = await axios.delete(`${productsApiUrl}/${productToDelete.id}`, productToDelete.id);
    return response.data;
  } catch (error) {
    throw Error('Error deleting product', error);
  }
};

/**
 * Fetches reservation data from the backend.
 * This asynchronous function makes a GET request to the provided API URL to
 retrieve reservation data.
 If the request is successful, it returns the reservation data.
 In case of an error during the fetch operation, it throws an error with a descriptive message.
 *
 */
export const getAllReservations = async () => {
  try {
    const response = await axios.get(reservationsApiUrl);
    return response.data;
  } catch (error) {
    throw Error('Error fetching customers', error.message);
  }
};

/**
 * This function is responsible for creating a new reservation by sending a POST
 request to the specified API endpoint (reservationsApiUrl) with the reservation
 data provided as an argument.
 */
export const createReservation = async (reservation) => {
  try {
    const response = await axios.post(`${reservationsApiUrl}`, reservation);
    return response.data;
  } catch (error) {
    throw Error('Error creating reservation', error);
  }
};

/**
 * This function is responsible for acessing an exisisting reservation by sending
 a GET request to the specified API endpoint (reservationsApiUrl) with the
 reservation Id provided as an argument.
 */
export const getReservationById = async (reservationId) => {
  try {
    const response = await axios.get(`${reservationsApiUrl}/${reservationId}`);
    return response.data;
  } catch (error) {
    throw Error('Could not fetch reservation', error);
  }
};

/**
 * This function is responsible for updating an exsisting reservation by sending
 a PUT request to the specified API endpoint (reservationsApiUrl) with the
 exsisting reservation data provided as an argument.
 Uses the Id to specify which reservation to update
 */
export const updateReservation = async (reservationToEdit) => {
  try {
    const response = await axios.put(`${reservationsApiUrl}/${reservationToEdit.id}`, reservationToEdit);
    return response.data;
  } catch (error) {
    throw Error('Error updating reservation', error);
  }
};

/**
 * This function is responsible for deleting an exsisting reservation by sending
 a DELETE request to the specified API endpoint (reservationsApiUrl) with the
 reservation Id provided as an argument.
 */
export const deleteReservation = async (reservationId) => {
  try {
    const response = await axios.delete(`${reservationsApiUrl}/${reservationId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting reservation', error);
  }
};

/**
 * Fetches ingredient data from the backend.
 *
 * This asynchronous function makes a GET request to the provided API URL to retrieve
 * ingredient data. If the request is successful, it returns the ingredient data. In case
 * of an error during the fetch operation, it throws an error with a descriptive message.
 *
 */
export const getIngredients = async () => {
  try {
    const response = await axios.get(ingredientsApiUrl);
    return response.data;
  } catch (error) {
    throw Error('Could not fetch ingredients', error);
  }
};

export const getIngredientById = async (id) => {
  try {
    const response = await axios.get(`${ingredientsApiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw Error('Could not fetch ingredient', error);
  }
};

export const createIngredient = async (ingredientToCreate) => {
  const response = await axios.post(ingredientsApiUrl, ingredientToCreate);
  return response.data;
};

export const editIngredient = async (ingredientToEdit) => {
  try {
    const response = await axios.put(`${ingredientsApiUrl}/${ingredientToEdit.id}`, ingredientToEdit);
    return response.data;
  } catch (error) {
    throw Error('Error updating vendor', error);
  }
};

export const deleteIngredient = async (ingredientToDelete) => {
  try {
    const response = await axios.delete(`${ingredientsApiUrl}/${ingredientToDelete.id}`, ingredientToDelete.id);
    return response.data;
  } catch (error) {
    throw Error('Error deleting ingredient', error);
  }
};
