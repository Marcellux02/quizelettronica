import data from './database.json';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const getQuestions = () => {
  const semiconduttori = data.filter(q => q.tipologia === 'Semiconduttori e dispositivi');
  const digitale = data.filter(q => q.tipologia === 'Elettronica digitale');
  const analogica = data.filter(q => q.tipologia === 'Elettronica analogica');

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