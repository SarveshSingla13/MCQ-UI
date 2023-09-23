import "./App.css";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import mcqs from "./mcq.json";

import ScoreBar from "./components/ScoreBar";
import Header from "./components/Header";
import NextButton from "./components/NextButton";

function shuffleOptions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const questions = [...mcqs];
  const [active, setActive] = useState(0);
  const [correct, setCorrect] = useState(undefined);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(
    localStorage.getItem("max_score")
      ? JSON.parse(localStorage.getItem("max_score"))
      : 0
  );

  const handleOptions = (incorrect, correct) => {
    const originalValues = [correct, ...incorrect];
    const randomizedArray = [...originalValues];
    shuffleOptions(randomizedArray);

    return randomizedArray;
  };

  const handleStars = (value) => {
    if (value === "easy") {
      return (
        <>
          <AiFillStar />
          <AiOutlineStar />
          <AiOutlineStar />
        </>
      );
    } else if (value === "medium") {
      return (
        <>
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
        </>
      );
    } else if (value === "hard") {
      return (
        <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </>
      );
    }
  };
  const handleAns = (ans) => {
    setSelectedOption(ans);
    if (questions[active].correct_answer === ans) {
      setCorrect(true);
      setScore((prev) => prev + 1);
    } else {
      setCorrect(false);
    }
  };

  const handleNextClick = () => {
    setCorrect(undefined);
    setSelectedOption("");
    setActive((prev) => prev + 1);
  };

  useEffect(() => {
    setOptions([
      ...handleOptions(
        questions[active]["incorrect_answers"],
        questions[active]["correct_answer"]
      ),
    ]);
  }, [active]);

  useEffect(() => {
    const currentScore = (score / questions.length) * 100;
    if (currentScore > maxScore) {
      localStorage.setItem("max_score", currentScore);
      setMaxScore(currentScore);
    }
  }, [score]);

  if (!questions || options.length === 0) return <></>;

  return (
    <div className="App">
      <div className="container">
        <div
          className="bar"
          style={{ width: `${((active + 1) / questions.length) * 100}%` }}
        ></div>
        <Header
          active={active + 1}
          category={decodeURIComponent(questions[active].category)}
          stars={handleStars(questions[active].difficulty)}
        />

        <div className="main">
          <p>{decodeURIComponent(questions[active].question)}</p>
          <div className="btns">
            {options.map((item, i) => {
              return (
                <button
                  style={
                    item === selectedOption
                      ? { backgroundColor: "black", color: "white" }
                      : {}
                  }
                  disabled={correct !== undefined}
                  key={i}
                  onClick={() => handleAns(item)}
                  className="btn"
                >
                  {decodeURIComponent(item)}
                </button>
              );
            })}
          </div>
          
          <NextButton
            correct={correct}
            correctAnswer={decodeURIComponent(questions[active].correct_answer)}
            disabled={active === questions.length - 1}
            handleClick={() => handleNextClick()}
          />

          <ScoreBar
            score={(score / questions.length) * 100}
            maxScore={maxScore}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
