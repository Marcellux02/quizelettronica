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

  const explain = async (i, q, userAnswerIndex) => {
    setLoading(prev => ({ ...prev, [i]: true }));
    if (!apiKey) {
      setExplanations(prev => ({ ...prev, [i]: 'Chiave API Gemini non configurata. Imposta VITE_GEMINI_API_KEY nelle variabili d\'ambiente.' }));
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
              {isCorrect ? (
                <p className="correct-answer">La tua risposta (corretta): <Latex>{q.opzioni[userAnswers[i]]}</Latex></p>
              ) : (
                <>
                  <p className="wrong-answer">La tua risposta: <Latex>{q.opzioni[userAnswers[i]]}</Latex></p>
                  <p className="correct-answer">Risposta corretta: <Latex>{q.opzioni[q.soluzione]}</Latex></p>
                </>
              )}
              {explanations[i] ? (
                <div className="explanation">
  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{explanations[i]}</ReactMarkdown>
</div>
              ) : loading[i] ? (
                <div className="loader"></div>
              ) : (
                <button onClick={() => explain(i, q, userAnswers[i])}>Spiega</button>
              )}
            </li>
          );
        })}
      </ul>
      <div className="button-container">
        <button onClick={onRestart}>Nuovo quiz con nuove domande random</button>
        <button onClick={onRepeat}>Ripeti quiz con le stesse domande appena fatte</button>
      </div>
    </div>
  );
};

export default Results;