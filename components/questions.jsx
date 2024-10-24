// components/Questions.js

import React from 'react';
import Spinner from './spinner';

const questions = [
  { type: 'truth', question: 'What is your biggest fear?' },
  { type: 'dare', question: 'Do 20 pushups.' },
  { type: 'truth', question: 'Who was your first crush?' },
  { type: 'dare', question: 'Sing a song of your choice.' },
  { type: 'truth', question: 'What is a secret you have never told anyone?' },
  { type: 'dare', question: 'Dance for 1 minute without music.' },
  // Add more questions as needed
];

const Questions = ({ selectedPlayer }) => {
  const randomQuestion =
    questions[Math.floor(Math.random() * questions.length)];

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold text-gray-800">
        {selectedPlayer ? `${selectedPlayer}'s Turn` : 'Random Question'}
      </h3>
      <p className="text-gray-600">{randomQuestion.question}</p>
    </div>
  );
};

export default Questions;
