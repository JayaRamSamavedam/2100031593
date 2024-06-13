import axios from 'axios';

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Set your base URL here
  timeout: 10000, // Set a timeout for requests
});

// Helper function to fetch data
export const fetchData = async (route) => {
  try {
    const response = await apiClient.get(route);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
