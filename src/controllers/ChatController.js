import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/generate/'; // Asegúrate de que la URL esté correcta

// Función para enviar el input al backend
export const sendMessage = async (inputData) => {
  try {
    const params = {
      user_input: inputData  // Enviar el input del usuario como JSON
    };

    const response = await axios.post(API_URL, params, {
      headers: {
        'Content-Type': 'application/json'  // Asegúrate de que el encabezado es 'application/json'
      }
    });

    return response.data.response;  // Devolver la respuesta del backend
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

