import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StateValue } from "../context/Context";

function Result() {
  const navigate = useNavigate();
  const [precentage, setPercentage] = useState(0);
  const [wrong, setWrong] = useState(0);
  const {
    setSelectedQuestion,
    numberOfQuestion,
    setCorrectAnswer,
    setSelectedOption,
    setAttemptedQuestion,
    attemptedQuestion,
    correctAnswer,
    setFinishQuiz,
  } = StateValue();

  const playAgain = () => {
    setSelectedQuestion(0);
    setCorrectAnswer(0);
    setAttemptedQuestion(0);
    setWrong(0);
    setSelectedOption(false);
    setFinishQuiz(true);
    navigate("/questions");
  };
  const toHome = () => {
    setSelectedQuestion(0);
    setAttemptedQuestion(0);
    setWrong(0);
    setCorrectAnswer(0);
    setSelectedOption(false);
    setFinishQuiz(true);
    navigate("/");
  };
  useEffect(() => {
    setWrong(attemptedQuestion - correctAnswer);
    if (attemptedQuestion === 0) {
      navigate("/");
    } else {
      if (correctAnswer === 0) {
        setPercentage(0);
      } else {
        setPercentage((correctAnswer / numberOfQuestion) * 100);
      }
    }
  }, []);
  return (
    <div className="app-home result-page">
      <div className="result-section">
        {precentage > 60 ? (
          <h2 className="result-title">You have passed the quiz test</h2>
        ) : (
          <h2 className="result-title">You need more practice</h2>
        )}
        <h1 className="result-score pass">Your Score: {`${precentage}%`}</h1>
        <div className="test-details">
          <div className="score-card">
            <p>Total number of questions:</p>
            <p>{numberOfQuestion}</p>
          </div>
          <div className="score-card">
            <p>Number of attempted questions:</p>
            <p>{attemptedQuestion}</p>
          </div>{" "}
          <div className="score-card">
            <p> Number of Correct questions:</p>
            <p>{correctAnswer}</p>
          </div>{" "}
          <div className="score-card">
            <p>Number of Wrong questions:</p>
            <p>{wrong}</p>
          </div>
        </div>
      </div>
      <div className="result-btn">
        <button className="btn play-again" onClick={playAgain}>
          Play Again
        </button>

        <button className="btn back-to-home" onClick={toHome}>
          Back to home
        </button>
      </div>
    </div>
  );
}

export default Result;
