import axios from 'axios';

const BASE_URL = "http://localhost:5000/api"; // Update with your API base URL

// Function to create a new service
export const createService = async (storeId, serviceData) => {
  try {
    const response = await axios.post(`${BASE_URL}/service/store/${storeId}/listService`, serviceData);
    return response.data;
  } catch (error) {
    console.error('Failed to create service:', error);
    throw error;
  }
};

// Function to list all services
export const listAllServices = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/service`);
    return response.data;
  } catch (error) {
    console.error('Failed to list services:', error);
    throw error;
  }
};

// Function to delete a service by ID
export const deleteService = async (serviceId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/service/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete service:', error);
    throw error;
  }
};
