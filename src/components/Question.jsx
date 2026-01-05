import React from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const Question = ({ question, onSelect, questionNumber, totalQuestions }) => {
  const shuffledOptions = Object.entries(question.opzioni).sort(() => Math.random() - 0.5);
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="glass-card rounded-3xl shadow-2xl p-6 sm:p-10 animate-slide-up">
      {/* Header with progress */}
      <div className="mb-8">
        {/* Progress bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap justify-between items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {question.tipologia}
          </span>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-medium ${
            question.fonte === 'Generati con AI' 
              ? 'bg-purple-100 text-purple-700' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {question.fonte}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-relaxed">
          <Latex>{question.domanda}</Latex>
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {shuffledOptions.map(([key, value], index) => (
          <button 
            key={key} 
            onClick={() => onSelect(key)}
            className="option-btn w-full text-left p-4 sm:p-5 bg-white border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold rounded-lg group-hover:scale-110 transition-transform">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-gray-700 font-medium">
                <Latex>{value}</Latex>
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
          <span className="text-sm text-gray-500">Domanda</span>
          <span className="text-lg font-bold text-indigo-600">{questionNumber}</span>
          <span className="text-sm text-gray-400">di</span>
          <span className="text-lg font-bold text-gray-600">{totalQuestions}</span>
        </div>
      </div>
    </div>
  );
};

export default Question;