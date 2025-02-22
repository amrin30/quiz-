
"use client";

import { useState, useEffect } from "react";
import { Progress } from "./ui/progress";
import { saveQuizHistory } from "./db";
import QuizHistory from "./QuizHistory";
import Question from "./Question";
import { clearQuizHistory } from "./db";
const quizData = [
  { id: 1, type: "multiple-choice", text: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], answer: 1 },
  { id: 2, type: "multiple-choice", text: "Which data structure follows FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: 1 },
  { id: 3, type: "multiple-choice", text: "What is primarily used for structuring web pages?", options: ["Python", "Java", "HTML", "C++"], answer: 2 },
  { id: 4, type: "multiple-choice", text: "Which chemical symbol stands for Gold?", options: ["Au", "Gd", "Ag", "Pt"], answer: 0 },
  { id: 5, type: "multiple-choice", text: "Which process is NOT involved in refining petroleum?", options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"], answer: 3 },
  { id: 6, type: "integer", text: "What is the value of 12 + 28?", answer: 40 },
  { id: 7, type: "integer", text: "How many states are there in the United States?", answer: 50 },
  { id: 8, type: "integer", text: "In which year was the Declaration of Independence signed?", answer: 1776 },
  { id: 9, type: "integer", text: "What is the value of pi rounded to the nearest integer?", answer: 3 },
  { id: 10, type: "integer", text: "If a car travels at 60 mph for 2 hours, how many miles does it travel?", answer: 120 }
];

const Quiz = ({ onQuizEnd }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [quizEnded, setQuizEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNextQuestion(null);
    }
  }, [timeLeft]);

  const handleNextQuestion = async (answer) => {
    const question = quizData[currentQuestionIndex];
    const isCorrect = question.type === "multiple-choice"
      ? answer === question.answer
      : Number.parseInt(userAnswer) === question.answer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex + 1 < quizData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
      setUserAnswer("");
    } else {
      await saveQuizHistory(score + (isCorrect ? 1 : 0));
      setQuizEnded(true);
      onQuizEnd(score + (isCorrect ? 1 : 0));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && userAnswer !== "") {
      handleNextQuestion(userAnswer);
    }
  };

  return (
    <div className="quiz-app flex flex-col items-center p-6 bg-white text-gray-900 w-full max-w-3xl mx-auto">
      <div className="w-full rounded-lg p-6 text-center">
        {!quizEnded ? (
          <>
            <div className="mb-6 flex justify-between items-center">
              <Progress value={(currentQuestionIndex / quizData.length) * 100} className="h-2 w-full bg-gray-300" />

              <div className="text-lg font-semibold text-gray-700">Time Left: {timeLeft}s</div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">{quizData[currentQuestionIndex].text}</h3>
            {quizData[currentQuestionIndex].type === "multiple-choice" ? (
              <Question question={quizData[currentQuestionIndex]} onAnswer={handleNextQuestion} />
            ) : (
              <div>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={() => handleNextQuestion(userAnswer)}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
            <p className="text-lg font-semibold text-gray-700">Your Score: <span className="text-gray-700">{score} / {quizData.length}</span></p>
            <QuizHistory />
            <button
              className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => { setQuizEnded(false); setCurrentQuestionIndex(0); setScore(0); setTimeLeft(30); }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
