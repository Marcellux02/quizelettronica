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
    <div className="app-container">
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
  );
}

export default App;
