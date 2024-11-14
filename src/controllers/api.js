export const sendFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file); 
  
    const response = await fetch('https://aee5-34-143-208-163.ngrok-free.app/saludo/', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Error al enviar el archivo');
    }
  
    const data = await response.json();
    return data.content; 
  };
  
  export const sendMessage = async (user_input) => {
    const response = await fetch('https://aee5-34-143-208-163.ngrok-free.app/saludo/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input }), // Match the backend's key
    });

    if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
    }

    const data = await response.json();
    return data.response;
  };
  