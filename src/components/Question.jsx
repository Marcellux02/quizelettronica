import React from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const Question = ({ question, onSelect, questionNumber, totalQuestions }) => {
  return (
    <div className="question-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.9em', color: '#666' }}>
          Categoria: {question.tipologia}
        </div>
        <div style={{ fontSize: '0.9em', color: question.fonte === 'Generati con AI' ? '#007bff' : '#666' }}>
          Fonte: {question.fonte}
        </div>
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