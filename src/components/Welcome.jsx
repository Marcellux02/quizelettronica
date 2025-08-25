import React from 'react';

const Welcome = ({ onStart }) => {
  return (
    <div className="welcome-container">
      <h1>Quiz di Elettronica</h1>
      <button onClick={onStart}>Inizia il Quiz</button>
    </div>
  );
};

export default Welcome;