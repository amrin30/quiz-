
import { useEffect, useState } from "react";
import { getQuizHistory, clearQuizHistory } from "./db";
import { FaClock, FaTrophy, FaHistory } from "react-icons/fa";

const QuizHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getQuizHistory().then(setHistory);
  }, []);

  const handleClearHistory = async () => {
    await clearQuizHistory();
    localStorage.removeItem("quizHistory"); 
    setHistory([]); 
    console.log("History cleared successfully");
  };

  return (
    <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg mx-auto text-center flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-2">
        <FaHistory /> Quiz History
      </h2>
      {history.length === 0 ? (
        <p className="text-gray-600">No quiz attempts yet.</p>
      ) : (
        <ul className="space-y-3 w-full">
          {history.map((attempt, index) => (
            <li key={index} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm w-full max-w-md">
              <span className="text-gray-700 flex items-center gap-2">
                <FaClock /> {new Date(attempt.date).toLocaleString()}
              </span>
              <span className="font-semibold text-gray-700 flex items-center gap-2">
                <FaTrophy /> Score: {attempt.score} / 10
              </span>
            </li>
          ))}
        </ul>
      )}
      <button
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
        onClick={handleClearHistory}
      >
        Clear History
      </button>
    </div>
  );
};

export default QuizHistory;
