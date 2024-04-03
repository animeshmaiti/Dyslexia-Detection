import React, { useState } from "react";
import FileUpload from "./FileUpload";
import Result from "./Result";
import image from "../img/img2.jpg";

function Home() {
  const [responses, setResponses] = useState({
    Prediction: null,
    Confidence: null,
    errorMessage: null,
  });

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResponses({
          ...responses,
          errorMessage: null,
          Prediction: data.prediction,
          Confidence: data.confidence,
        });
      } else if (response.status === 429) {
        const htmlString = await response.text();
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(htmlString, "text/html");
        const tooManyRequestsMessage = htmlDocument
          .querySelector("p")
          .textContent.trim();
        setResponses({
          ...responses,
          errorMessage: `Too many request ${tooManyRequestsMessage}`,
        });
      } else if (response.status === 500) {
        setResponses({
          ...response,
          errorMessage: "500 Internal server error",
        });
      } else {
        console.error("Error while making prediction");
      }
    } catch (error) {
      console.error("Error during form submission:", error.message);
    }
  };
  return (
    <div className="container home">
      <div className="hero">
        <h2>Detect Dyslexia Early: Start Here</h2>
        <p>
          Our dyslexia detection service helps identify dyslexia in individuals
          of all ages. Get started by providing your information below.
        </p>
        <img src={image} alt="Dyslexia Detection Illustration" />
      </div>
      <div className="formSec">
        <FileUpload />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Process data
        </button>
        <h2>Result</h2>
        {responses.Prediction !== null ? (
          <Result
            prediction={responses.Prediction}
            confidence={responses.Confidence}
            error={responses.errorMessage} // Pass the errorMessage to Result component
          />
        ) : (
          <p>Loading prediction...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
