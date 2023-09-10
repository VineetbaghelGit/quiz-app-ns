import React, { createContext, useContext, useEffect, useState } from "react";
const QuizContext = createContext();

function Context({ children }) {
  const [questionList, setQuestionList] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [options, setOptions] = useState([]);
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [selectedOption, setSelectedOption] = useState(false);
  const [attemptedQuestion, setAttemptedQuestion] = useState(0);
  const [finishQuiz, setFinishQuiz] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const url = "https://opentdb.com/api.php?amount=10";
    const data = await fetch(url);
    const res = await data.json();
    setQuestionList(res.results);
    setNumberOfQuestion(res.results.length);
    const randomOption = () => {
      const seriesOption = [
        res.results[0]?.correct_answer,
        ...res.results[0]?.incorrect_answers,
      ];
      setOptions(
        seriesOption
          .map((answer) => ({ sort: Math.random(), value: answer }))
          .sort((a, b) => a.sort - b.sort)
      );
    };
    randomOption();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [finishQuiz]);
  return (
    <QuizContext.Provider
      value={{
        questionList,
        setQuestionList,
        selectedQuestion,
        setSelectedQuestion,
        options,
        setOptions,
        numberOfQuestion,
        correctAnswer,
        setCorrectAnswer,
        selectedOption,
        setSelectedOption,
        setFinishQuiz,
        attemptedQuestion,
        setAttemptedQuestion,
        loading,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
export const StateValue = () => {
  return useContext(QuizContext);
};

export default Context;
