import electronicsData from './database.json';
import cognitionData from './cognition.json';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const getQuestions = (quizType) => {
  if (quizType === 'cognition') {
    const questions = [...cognitionData];
    shuffleArray(questions);
    return questions.slice(0, 20);
  }

  const allQuestions = electronicsData.filter(q => q.soluzione !== 'NON IN PROGRAMMA');

  const semiconduttori = allQuestions.filter(q => q.tipologia === 'Semiconduttori e dispositivi');
  const digitale = allQuestions.filter(q => q.tipologia === 'Elettronica digitale');
  const analogica = allQuestions.filter(q => q.tipologia === 'Elettronica analogica');

  shuffleArray(semiconduttori);
  shuffleArray(digitale);
  shuffleArray(analogica);

  const questions = [
    ...semiconduttori.slice(0, 8),
    ...digitale.slice(0, 6),
    ...analogica.slice(0, 6),
  ];

  shuffleArray(questions);
  return questions;
};
