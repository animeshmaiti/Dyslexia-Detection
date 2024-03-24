import React,{useState} from 'react';
import axios from 'axios';


function FileUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const handleUpload = () => {
      const formData = new FormData();
      formData.append('file', file);
  
      axios.post('http://127.0.0.1:5000/upload', formData)
        .then((response) => {
          console.log('File uploaded successfully');
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    };
  
    return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    );
}

export default FileUpload