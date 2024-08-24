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
