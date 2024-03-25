import React from "react";

function Result(props) {
  let result = null;
  let error=props.error;
  if (props.prediction === 1) {
    result = "Dyslexic";
  } else if (props.prediction === 0) {
    result = "not dyslexic";
  }
  return (
    <div className="container">
      {error===null?(<p>
        Person is <b>{result}</b> with confidence <b>{props.confidence}%</b>
      </p>):(
        <p>{error}</p>
      )}
    </div>
  );
}

export default Result;