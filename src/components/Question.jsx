import React from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const Question = ({ question, onSelect, questionNumber, totalQuestions }) => {
  return (
    <div className="question-container">
      <div style={{ textAlign: 'left', fontSize: '0.9em', color: '#666', marginBottom: '1rem' }}>
        Categoria: {question.tipologia}
      </div>
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