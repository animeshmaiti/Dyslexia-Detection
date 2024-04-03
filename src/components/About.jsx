import React from "react";
import image from "../img/img3.png";

function About() {
  return (
    <>
      <div className="container min-vh-100 about about-section mt-5">
          <img src={image} className="logo" alt="Company Logo" />
          <div className="container mt-2">
            <h2>Dyslexia Detection</h2>
            <p>
              Dyslexia, a neurodevelopmental condition affecting language
              processing, poses challenges in reading and writing for
              individual.Our Objective is early detection of Dyslexia. Early
              identification is vital for effective support, considering the
              unique manifestation of dyslexia in each person using EEG signal.
              Electroencephalogram (EEG), signal is a recording of the
              electrical activity of the brain with respect to the internal and
              external stimuli.
            </p>
          </div>
          <h2>Group Members</h2>
          <h4>Aman Khan 2130005</h4>
          <h4>Animesh Maiti 2130006</h4>
          <h4>Akash Ghorai 2130041</h4>
          <h4>Shashank Shekhar 2130075</h4>
        </div>
    </>
  );
}

export default About;
