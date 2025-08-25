import React from 'react';
import Latex from 'react-latex';

const Question = ({ question, onSelect, questionNumber, totalQuestions }) => {
  return (
    <div className="question-container">
      <h2><Latex>{question.domanda}</Latex></h2>
      <div className="options-container">
        {Object.entries(question.opzioni).map(([key, value]) => (
          <button key={key} onClick={() => onSelect(key)}>
            <Latex>{value}</Latex>
          </button>
        ))}
      </div>
      <p>Domanda {questionNumber} di {totalQuestions}</p>
    </div>
  );
};

export default Question;