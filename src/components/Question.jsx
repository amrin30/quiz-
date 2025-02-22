

const Question = ({ question, onAnswer }) => {
  if (!question) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      {question.type === "multiple-choice" ? (
        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-500 hover:bg-gray-200 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <input
          type="number"
          className="w-full px-4 py-3 rounded-lg border border-gray-200"
          placeholder="Enter your answer..."
        />
      )}
    </div>
  );
};

export default Question;
