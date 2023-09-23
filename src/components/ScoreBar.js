import React from 'react';
import '../App.css';
import MultiProgress from "react-multi-progress";

function ScoreBar(props) {
    const {score,maxScore}=props;
  return (
    <div>
    <div className='score_text'> 
      <p>Score: {score}% </p>
      <p>Max Score: {maxScore}% </p>
    </div>
  
<div className='score_bar'>
<MultiProgress
transitionTime={1}
elements={[
  {
    value: score,
    color: "black"
  }, 
  {
    value:maxScore>score?maxScore-score:0,
    color: "grey",
  }
]}
height={15}
/>
</div>
</div>
  )
}

export default ScoreBar