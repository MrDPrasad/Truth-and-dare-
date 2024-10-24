import React, { useState, useRef } from 'react';
import '../app/globals.css';

const Spinner = () => {
  const [players, setPlayers] = useState([]);
  const [numPlayers, setNumPlayers] = useState('');
  const [currentStep, setCurrentStep] = useState('input');
  const [currentPlayerInput, setCurrentPlayerInput] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSpinner, setCurrentSpinner] = useState(null);
  const [question, setQuestion] = useState('');
  const [selectedOption, setSelectedOption] = useState(null); // Initially no option selected
  const wheelRef = useRef(null);

  const truthOrDareQuestions = {
    Truth: [
      "What's your biggest fear?",
      "Have you ever lied to get out of trouble?",
      "What's the most embarrassing thing you've done?",
      "Who was your first crush?",
    ],
    Dare: [
      "Do 10 push-ups!",
      "Sing a song chosen by the group.",
      "Send a silly selfie to someone in your contacts.",
      "Dance without music for 1 minute.",
    ],
  };

  const handleNumPlayersSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(numPlayers);
    if (num >= 3 && num <= 6) {
      setCurrentStep('names');
    }
  };

  const handlePlayerNameSubmit = (e) => {
    e.preventDefault();
    if (currentPlayerInput.trim()) {
      setPlayers([...players, currentPlayerInput.trim()]);
      setCurrentPlayerInput('');

      if (players.length + 1 === parseInt(numPlayers)) {
        setCurrentStep('spin');
      }
    }
  };

  const getRandomPlayer = () => {
    const randomIndex = Math.floor(Math.random() * players.length);
    return players[randomIndex];
  };

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const spins = 5 + Math.floor(Math.random() * 3); // Spin the wheel 5-7 times
    const targetRotation = spins * 360;

    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 3s ease-out';
      wheelRef.current.style.transform = `rotate(${targetRotation}deg)`;
    }

    setTimeout(() => {
      setIsSpinning(false);
      const targetPlayer = getRandomPlayer();
      setSelectedPlayer(targetPlayer);
      setSelectedOption(null); // Reset selected option after spin
      setQuestion(''); // Reset question after spin
    }, 3000); // Duration of the spin
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Select a random question based on Truth or Dare
    const randomQuestion =
      truthOrDareQuestions[option][
        Math.floor(Math.random() * truthOrDareQuestions[option].length)
      ];
    setQuestion(randomQuestion);
  };

  const handleNextSpin = () => {
    // Reset state for the next spin
    setSelectedPlayer(null);
    setSelectedOption(null);
    setQuestion('');
    spinWheel(); // Call spinWheel for the next spin
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        {currentStep === 'input' && (
          <form onSubmit={handleNumPlayersSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How many players? (3-6)</h2>
            <input
              type="number"
              min="3"
              max="6"
              value={numPlayers}
              onChange={(e) => setNumPlayers(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Next
            </button>
          </form>
        )}

        {currentStep === 'names' && (
          <form onSubmit={handlePlayerNameSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Enter player {players.length + 1} name:
            </h2>
            <input
              type="text"
              value={currentPlayerInput}
              onChange={(e) => setCurrentPlayerInput(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Player
            </button>
          </form>
        )}

        {currentStep === 'spin' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              {selectedPlayer ? `Selected: ${selectedPlayer}` : 'Spin the Bottle!'}
            </h2>

            <div className="relative w-64 h-64 mx-auto">
              <div
                ref={wheelRef}
                className="absolute inset-0 transition-transform duration-[3000ms] ease-out"
              >
                <div className="relative w-full h-full">
                  {players.map((player, index) => {
                    const rotation = (index * 360) / players.length;
                    return (
                      <div
                        key={player}
                        className="absolute w-full h-full origin-center"
                        style={{ transform: `rotate(${rotation}deg)` }}
                      >
                        <div className="absolute inset-x-0 -top-8 text-center">
                          <span className="inline-block bg-purple-100 px-3 py-1 rounded-full text-purple-800 transform -rotate-[inherit]">
                            {player}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="absolute inset-0 border-4 border-purple-600 rounded-full" />
                </div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
                <div className="w-4 h-4 bg-red-500 transform rotate-45" />
              </div>
            </div>

            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className={`w-full py-2 px-4 rounded-lg text-white transition-colors ${
                isSpinning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              Spin!
            </button>

            {selectedPlayer && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Choose Truth or Dare:</h3>
                <div className="flex justify-around mb-4">
                  <button
                    onClick={() => handleOptionSelect('Truth')}
                    className={`py-2 px-4 rounded-lg text-white transition-colors ${selectedOption === 'Truth' ? 'bg-purple-600' : 'bg-gray-400 hover:bg-gray-500'}`}
                  >
                    Truth
                  </button>
                  <button
                    onClick={() => handleOptionSelect('Dare')}
                    className={`py-2 px-4 rounded-lg text-white transition-colors ${selectedOption === 'Dare' ? 'bg-purple-600' : 'bg-gray-400 hover:bg-gray-500'}`}
                  >
                    Dare
                  </button>
                </div>

                {selectedOption && question && (
                  <div className="mt-4 p-4 border rounded-lg bg-gray-100">
                    <h3 className="text-lg font-semibold">Question for {selectedPlayer}:</h3>
                    <p className="text-gray-700">{selectedOption}: {question}</p>
                  </div>
                )}
              </div>
            )}

            {selectedOption && (
              <button
                onClick={handleNextSpin}
                className="mt-4 w-full py-2 px-4 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Next Spin
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Spinner;
