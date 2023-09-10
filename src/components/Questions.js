import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StateValue } from "../context/Context";
import Result from "./Result";
import Loader from "../loader/Loader";

function Questions() {
  const [showresult, setShowResult] = useState(false);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("");
  const [attemptedFlag, setAttemptedFlag] = useState(false);
  const {
    questionList,
    selectedQuestion,
    setSelectedQuestion,
    options,
    setOptions,
    correctAnswer,
    setCorrectAnswer,
    selectedOption,
    setSelectedOption,
    attemptedQuestion,
    setAttemptedQuestion,
    loading,
  } = StateValue();
  const randomOption = () => {
    const seriesOption = [
      questionList[selectedQuestion + 1]?.correct_answer,
      ...questionList[selectedQuestion + 1]?.incorrect_answers,
    ];
    setOptions(
      seriesOption
        .map((answer) => ({ sort: Math.random(), value: answer }))
        .sort((a, b) => a.sort - b.sort)
    );
  };

  const gotoNext = () => {
    setAttemptedFlag(false);
    setSelectedOption(false);
    setSelectedQuestion((prev) => {
      if (prev === questionList?.length - 1) {
        setShowResult(true);
        navigate("/result");
      } else {
        return (prev + 1) % questionList?.length;
      }
    });
    if (selectedQuestion !== questionList?.length - 1) {
      randomOption();
    }
  };

  const checkAnswer = (item) => {
    setActiveButton(item.sort);
    if (!attemptedFlag) {
      setAttemptedQuestion((prev) => prev + 1);
      setAttemptedFlag(true);
    }
    if (item.value === questionList[selectedQuestion]?.correct_answer) {
      if (!selectedOption) {
        setSelectedOption(true);
        setCorrectAnswer((prev) => prev + 1);
      } else {
        setCorrectAnswer(correctAnswer);
      }
    }
    if (attemptedFlag === 1) {
      setAttemptedQuestion((prev) => prev + 1);
    }
  };
  const exitQuiz = () => {
    var submit = "Do you want to submit the quiz?";
    if (window.confirm(submit) === true) {
      navigate("/result");
    } else {
      alert("Continue");
    }
  };
  return (
    <>
      {showresult ? (
        <Result />
      ) : loading ? (
        <Loader />
      ) : (
        <div className="app-home">
          <div className="quiz-section">
            <h1 className="title">Question</h1>
            Q.{selectedQuestion + 1} of {questionList.length}{" "}
            <p className="question">
              {questionList[selectedQuestion]?.question}
            </p>
            <div className="options">
              {options.map((item, key) => {
                return (
                  <button
                    className={
                      activeButton === item.sort
                        ? "option-btn active"
                        : "option-btn"
                    }
                    onClick={() => checkAnswer(item)}
                    key={key}
                    id={key}
                  >
                    {item.value}
                  </button>
                );
              })}
            </div>
            <div className="navigate-btn">
              <button className="navigate-next btn" onClick={gotoNext}>
                Next
              </button>
              <button className="navigate-quit btn" onClick={exitQuiz}>
                Quit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Questions;
