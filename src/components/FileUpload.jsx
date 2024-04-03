import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    age: "",
    gender: "",
  });
  const [uploadMessage, setUploadMessage] = useState("");

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      setUploadMessage("No file part");
      return;
    }
    const formDataObject = new FormData();
    formDataObject.append("file", file);

    // Append form field values directly from the state
    formDataObject.append("name", formData.name);
    formDataObject.append("address", formData.address);
    formDataObject.append("phoneNumber", formData.phoneNumber);
    formDataObject.append("email", formData.email);
    formDataObject.append("age", formData.age);
    formDataObject.append("gender", formData.gender);

    axios
      .post("http://127.0.0.1:5000/upload", formDataObject)
      .then((response) => {
        setUploadMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setUploadMessage("Error uploading file");
      });
  };

  return (
      <div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="city, state, zip code"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Contact Number
          </label>
          <input
            type="number"
            className="form-control"
            id="phoneNumber"
            placeholder="123-456-7890"
            onChange={handleInputChange}
            value={formData.phoneNumber}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            placeholder="22"
            value={formData.age}
            onChange={handleInputChange}
          />
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          id="gender"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option defaultValue>Gender</option>
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Other</option>
        </select>
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
        {uploadMessage !== "" ? (
          <div>{uploadMessage}</div>
        ) : (
          <p>No file uploaded</p>
        )}
      </div>
  );
}

export default FileUpload;
