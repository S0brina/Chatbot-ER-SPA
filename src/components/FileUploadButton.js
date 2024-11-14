import React, { useRef } from 'react';
function FileUploadButton({ onFileSelect, selectedFile, onFileRemove }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop().toLowerCase();
      if (['txt', 'doc', 'pdf'].includes(fileType)) {
        onFileSelect(file); 
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
      {selectedFile && (
        <div className="file-info">
          <p>{selectedFile.name}</p>
          <button onClick={onFileRemove}>Eliminar archivo</button>
        </div>
      )}
    </div>
  );
}

export default FileUploadButton;
