import React from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const Results = ({ score, questions, userAnswers, onRestart }) => {
  return (
    <div className="results-container">
      <h2>Quiz Terminato!</h2>
      <p>Punteggio finale: {score} / {questions.length}</p>
      <h3>Tutte le risposte:</h3>
      <ul>
        {questions.map((q, i) => {
          const isCorrect = userAnswers[i] === q.soluzione;
          return (
            <li key={i} className={isCorrect ? 'correct-card' : 'wrong-card'}>
              <h4>Domanda {i + 1}</h4>
              <p><Latex>{q.domanda}</Latex></p>
              <p className={isCorrect ? 'correct-answer' : 'wrong-answer'}>La tua risposta: <Latex>{q.opzioni[userAnswers[i]]}</Latex></p>
              <p className="correct-answer">Risposta corretta: <Latex>{q.opzioni[q.soluzione]}</Latex></p>
            </li>
          );
        })}
      </ul>
      <button onClick={onRestart}>Ripeti il Quiz</button>
    </div>
  );
};

export default Results;