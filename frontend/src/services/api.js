import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/communications';

export const getCommunicationData = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching communication data:', error);
    throw error;
  }
};

export const postCommunicationData = async (data) => {
  try {
    const response = await axios.post(API_BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error posting communication data:', error);
    throw error;
  }
};

export const updateCommunicationData = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating communication data:', error);
    throw error;
  }
};

export const deleteCommunicationData = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting communication data:', error);
    throw error;
  }
};
