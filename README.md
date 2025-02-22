# Interactive Quiz Platform

This is an interactive quiz platform where users can attempt quizzes, receive instant feedback, and track their progress. The platform supports multiple attempts, quiz history, timer-based questions, and a scoreboard at the end of each quiz.

## Features

- **Quiz Creation & Management**: Displays a list of questions as a quiz. Multiple attempts are allowed.
- **User Interaction**: Users can select answers and get instant feedback. Each question has a timer (e.g., 30 seconds per question).
- **Progress Tracking**: Displays a scoreboard at the end of each quiz attempt, including the score and feedback.
- **Quiz History**: Displays a history of previous quiz attempts.
- **Bonus Feature**: Saves quiz history using IndexedDB for persistence across sessions.
  
## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/amrin30/quiz.git
Navigate into the project directory:

bash

cd interactive-quiz
Install the necessary dependencies:

bash
npm install
Run the application:

bash
npm run dev
Open your browser and navigate to http://localhost:5173 to access the app.

Usage
Visit the quiz platform.
Click "Start Quiz" to begin.
Select answers and submit to get feedback.
At the end of each quiz attempt, see your score and a message with your performance feedback.
View your quiz history and attempt the quiz again if needed.
Deployment
The app is live and can be accessed here: https://quiz03.vercel.app/

Code Quality
The code is clean, modular, and well-organized to ensure maintainability.
Comments are provided for non-trivial logic to explain functionality.
Edge Case Handling
The app handles:
User input validation for quiz answers.
Timer expiration logic when time runs out for a question.
Error handling for quiz data fetching and unexpected issues.
UI/UX Design
The interface is modern, responsive, and user-friendly.
Smooth interactions are implemented to improve user experience.
