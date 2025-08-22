import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com/api' 
  : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const analyzeResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  
  const response = await api.post('/resume/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const generateQuestions = async (role) => {
  const response = await api.post('/interview/questions', { role });
  return response.data;
};

export const analyzeInterview = async (transcript) => {
  const response = await api.post('/interview/analyze', { transcript });
  return response.data;
};

export default api;