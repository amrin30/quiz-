
"use client";

import { useState, useEffect } from "react";
import Quiz from "./components/Quiz";
import Scoreboard from "./components/Scoreboard";
import QuizHistory from "./components/QuizHistory";
import { getQuizHistory } from "./components/db";

const App = () => {
  const [quizState, setQuizState] = useState("start");
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getQuizHistory().then(setHistory); 
  }, [quizState]); 

  const startQuiz = () => {
    setQuizState("quiz");
    setScore(0);
  };

  const endQuiz = (finalScore) => {
    setScore(finalScore);
    setQuizState("end");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 border border-gray-300 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Interactive Quiz</h1>
        <p className="text-lg text-gray-600 mb-6">Test your knowledge with our interactive quiz</p>

        {quizState === "start" && (
          <button
            onClick={startQuiz}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Start Quiz
          </button>
        )}

        {quizState === "quiz" && <Quiz onQuizEnd={endQuiz} />}

        {quizState === "end" && (
          <div className="text-center">
            <Scoreboard score={score} />
            <QuizHistory history={history} />
            <button
              onClick={startQuiz}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
