import axios from 'axios';
import { getUserId } from '../utils/SessionManager';

const API_TEXT_URL = 'https://chatbot-api-h8fcfsh6hzf8c4g6.brazilsouth-01.azurewebsites.net/call-llm-text/';
const API_FILE_URL = 'https://chatbot-api-h8fcfsh6hzf8c4g6.brazilsouth-01.azurewebsites.net/upload-file/';

export const sendMessage = async (inputData) => {
  try {
    const userId = getUserId();
    const response = await axios.post(
      API_TEXT_URL,
      { user_input: inputData, user_id: userId},
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const uploadFile = async (file) => {
  try {
    const userId = getUserId(); 
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId);

    const response = await axios.post(API_FILE_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data.result;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};