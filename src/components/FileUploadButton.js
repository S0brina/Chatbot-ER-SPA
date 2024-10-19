import React, { useRef } from 'react';

function FileUploadButton({ onFileSelect, selectedFile }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop().toLowerCase();
      if (['txt', 'doc', 'pdf'].includes(fileType)) {
        onFileSelect(file);  // Llamamos a la función pasada como prop
      } else {
        alert('Solo se permiten archivos .txt, .doc o .pdf');
      }
    }
  };

  return (
    <div className="file-upload-container">
      <button
        className="file-upload-button"
        onClick={() => fileInputRef.current.click()}
      >
        📎
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".txt,.doc,.pdf"
      />
    </div>
  );
}

export default FileUploadButton;
