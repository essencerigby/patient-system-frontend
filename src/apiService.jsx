import axios from 'axios';

const vendorsApiUrl = 'http://localhost:8085/vendors';
const productsApiUrl = 'http://localhost:8085/products';

export const getVendors = async () => {
  try {
    const response = await axios.get(vendorsApiUrl);
    return response.data;
  } catch (error) {
    throw Error('Could not fetch vendors', error);
  }
};

export const getVendorById = async (id) => {
  try {
    const response = await axios.get(`${vendorsApiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw Error('Could not fetch vendor', error);
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
