import React from 'react'
import '../App.css';

function NextButton(props) {
    const {correct,correctAnswer,disabled,handleClick}=props;
  return (
    <div className="next_btn">
    <p>
      {correct === true
        ? "Correct"
        : correct === false
        ? `Sorry, Correct ans is ${correctAnswer}.`
        : ""}
    </p>
    {correct !== undefined && (
      <button
        disabled={disabled}
        onClick={() => handleClick()}
        className="btn2"
      >
        Next{" "}
      </button>
    )}
  </div>
  )
}

export default NextButton