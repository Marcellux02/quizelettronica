import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Welcome from './components/Welcome.jsx';
import Question from './components/Question.jsx';
import Results from './components/Results.jsx';
import { getQuestions } from './quizLogic';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('welcome'); // welcome, playing, results
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const startQuiz = () => {
    const selectedQuestions = getQuestions();
    setQuestions(selectedQuestions);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setGameState('playing');
  };

  const repeatQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setGameState('playing');
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameState('results');
    }
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].soluzione ? 1 : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-8 px-4 sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-3xl">
          {gameState === 'welcome' && <Welcome onStart={startQuiz} />}
          {gameState === 'playing' && (
            <CSSTransition
              key={currentQuestion}
              timeout={300}
              classNames="fade"
            >
              <Question
                question={questions[currentQuestion]}
                onSelect={handleAnswer}
                questionNumber={currentQuestion + 1}
                totalQuestions={questions.length}
              />
            </CSSTransition>
          )}
          {gameState === 'results' && (
            <Results
              score={calculateScore()}
              questions={questions}
              userAnswers={userAnswers}
              onRestart={startQuiz}
              onRepeat={repeatQuiz}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
