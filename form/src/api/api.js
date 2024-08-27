import axios from 'axios';

const BASE_URL = "http://localhost:5000/api"; // Update with your API base URL

// Function to create a new service
export const createService = async (storeId, serviceData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/service/store/${storeId}/listService`, serviceData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create service:', error);
    throw error;
  }
};

// Function to list all services
export const listAllServices = async (token) => {
  try {
    const response = await axios.post(`${BASE_URL}/service`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to list services:', error);
    throw error;
  }
};

// Function to delete a service by ID
export const deleteService = async (serviceId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/service/${serviceId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete service:', error);
    throw error;
  }
};


// Function to create a new event
export const createEvent = async (eventData, token) => {
    try {
      const response = await axios.post(`${BASE_URL}/event`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

// Function to get all events
export const getAllEvents = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/event`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      return response.data; 
    } catch (error) {
      console.error('Error fetching events:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

// Function to delete an event by ID
export const deleteEvent = async (eventId, token) => {
    try {
      const response = await axios.delete(`${BASE_URL}/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  };


