import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      setUploadMessage('No file part');
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://127.0.0.1:5000/upload", formData)
      .then((response) => {
        setUploadMessage(response.data.message);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        setUploadMessage('Error uploading file');
      });
  };

  return (
    <div className="d-flex flex-column">
      <div className="input-group mt-3 mb-3">
        <input
          type="file"
          className="form-control"
          id="File"
          aria-describedby="FileAddon"
          aria-label="Upload"
          onChange={handleFileChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="FileAddon"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
      {uploadMessage !== '' ? (
          <div>{uploadMessage}</div>
        ) : (
          <p>No file uploaded</p>
        )}
    </div>
  );
}

export default FileUpload;
