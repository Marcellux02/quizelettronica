import React from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const Results = ({ score, questions, userAnswers, onRestart }) => {
  const wrongAnswers = questions.filter((q, i) => userAnswers[i] !== q.soluzione);

  return (
    <div className="results-container">
      <h2>Quiz Terminato!</h2>
      <p>Punteggio finale: {score} / {questions.length}</p>
      <h3>Risposte sbagliate:</h3>
      <ul>
        {wrongAnswers.map((q, i) => (
          <li key={i}>
            <p><Latex>{q.domanda}</Latex></p>
            <p className="wrong-answer">La tua risposta: <Latex>{q.opzioni[userAnswers[questions.indexOf(q)]]}</Latex></p>
            <p className="correct-answer">Risposta corretta: <Latex>{q.opzioni[q.soluzione]}</Latex></p>
          </li>
        ))}
      </ul>
      <button onClick={onRestart}>Ripeti il Quiz</button>
    </div>
  );
};

export default Results;