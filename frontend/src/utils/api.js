import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export const resumeAPI = {
  analyze: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await api.post('/resume/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
};

export const interviewAPI = {
  getQuestions: async (role) => {
    const response = await api.post('/interview/questions', { role });
    return response.data;
  },
  
  analyze: async (transcript) => {
    const response = await api.post('/interview/analyze', { transcript });
    return response.data;
  },
};

export default api;