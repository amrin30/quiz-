const Scoreboard = ({ score }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
      <p className="text-xl mb-2">Your Score:</p>
      <p className="text-4xl font-bold text-gray-900">{score} / 10</p>
      <p className="mt-4 text-gray-600">
        {score === 10 ? "Perfect score!" : score >= 7 ? "Great job!" : score >= 5 ? "Good effort!" : "Keep practicing!"}
      </p>
    </div>
  )
}

export default Scoreboard

