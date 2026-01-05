import React from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const Results = ({ score, questions, userAnswers, onRestart, onRepeat }) => {
  const [explanations, setExplanations] = React.useState({});
  const [loading, setLoading] = React.useState({});
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const percentage = Math.round((score / questions.length) * 100);

  const explain = async (i, q, userAnswerIndex) => {
    setLoading(prev => ({ ...prev, [i]: true }));
    if (!apiKey) {
      setExplanations(prev => ({ ...prev, [i]: 'Chiave API Gemini non configurata. Imposta VITE_GEMINI_API_KEY nelle variabili d\'ambiente.' }));
      setLoading(prev => ({ ...prev, [i]: false }));
      return;
    }

    const prompt = `Spiega in dettaglio perché la risposta data è ${userAnswerIndex === q.soluzione ? 'corretta' : 'sbagliata'} per la domanda: ${q.domanda}. Opzioni: ${Object.entries(q.opzioni).map(([key, opt]) => `Opzione ${key}: ${opt}`).join('\n')}. Risposta data: Opzione ${userAnswerIndex}: ${q.opzioni[userAnswerIndex]}. Risposta corretta: Opzione ${q.soluzione}: ${q.opzioni[q.soluzione]}. La spiegazione deve essere chiara ma breve, massimo 15/20 righe`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) throw new Error('Errore nella chiamata API');

      const data = await response.json();
      const explanation = data.candidates[0].content.parts[0].text;
      setExplanations(prev => ({ ...prev, [i]: explanation }));
      setLoading(prev => ({ ...prev, [i]: false }));
    } catch (error) {
      setExplanations(prev => ({ ...prev, [i]: `Errore: ${error.message}` }));
      setLoading(prev => ({ ...prev, [i]: false }));
    }
  };

  const getScoreColor = () => {
    if (percentage >= 80) return 'from-green-400 to-emerald-500';
    if (percentage >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-rose-500';
  };

  const getScoreEmoji = () => {
    if (percentage >= 80) return '🎉';
    if (percentage >= 60) return '👍';
    return '💪';
  };

  return (
    <div className="glass-card rounded-3xl shadow-2xl p-6 sm:p-10 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-6xl mb-4">{getScoreEmoji()}</div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Quiz Terminato!
        </h2>
        <p className="text-gray-500 mb-6">Ecco il tuo risultato</p>

        {/* Score Circle */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * percentage) / 100}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-gray-800">{score}/{questions.length}</span>
            <span className="text-sm text-gray-500">{percentage}%</span>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4 mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Riepilogo Risposte
        </h3>

        {questions.map((q, i) => {
          const isCorrect = userAnswers[i] === q.soluzione;
          return (
            <div 
              key={i} 
              className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                isCorrect ? 'result-card-correct' : 'result-card-wrong'
              } bg-white shadow-sm hover:shadow-md`}
            >
              {/* Question header */}
              <div className="flex items-start gap-3 mb-4">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  isCorrect ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {isCorrect ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </span>
                <div>
                  <span className="text-sm font-medium text-gray-500">Domanda {i + 1}</span>
                  <p className="text-gray-800 font-medium mt-1">
                    <Latex>{q.domanda}</Latex>
                  </p>
                </div>
              </div>

              {/* Answers */}
              <div className="ml-11 space-y-2">
                {isCorrect ? (
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 rounded-lg px-4 py-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">La tua risposta: <Latex>{q.opzioni[userAnswers[i]]}</Latex></span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-red-700 bg-red-50 rounded-lg px-4 py-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">La tua risposta: <Latex>{q.opzioni[userAnswers[i]]}</Latex></span>
                    </div>
                    <div className="flex items-center gap-2 text-green-700 bg-green-50 rounded-lg px-4 py-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Risposta corretta: <Latex>{q.opzioni[q.soluzione]}</Latex></span>
                    </div>
                  </>
                )}
              </div>

              {/* Explanation */}
              <div className="ml-11 mt-4">
                {explanations[i] ? (
                  <div className="bg-indigo-50 rounded-xl p-4 text-gray-700">
                    <div className="flex items-center gap-2 text-indigo-700 font-medium mb-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Spiegazione AI
                    </div>
                    <div className="markdown-content text-sm leading-relaxed">
                      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {explanations[i]}
                      </ReactMarkdown>
                    </div>
                  </div>
                ) : loading[i] ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="loader"></div>
                  </div>
                ) : (
                  <button 
                    onClick={() => explain(i, q, userAnswers[i])}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Spiega con AI
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onRestart}
          className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Nuovo Quiz Random
        </button>
        <button 
          onClick={onRepeat}
          className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-indigo-600 font-semibold bg-white border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Ripeti Quiz
        </button>
      </div>
    </div>
  );
};

export default Results;