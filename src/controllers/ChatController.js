import axios from 'axios';

const API_URL = 'https://aee5-34-143-208-163.ngrok-free.app/saludo/'; 

export const sendMessage = async (inputData) => {
  try {
    const params = {
      user_input: inputData 
    };

    const response = await axios.post(API_URL, params, {
      headers: {
        'Content-Type': 'application/json' 
      }
    });

    return response.data.response; 
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

