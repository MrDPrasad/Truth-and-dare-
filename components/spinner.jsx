import { useState } from 'react';

const Spinner = ({ players, onSelected }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Handles spinning logic
  const spinWheel = () => {
    if (isSpinning) return; // Prevent multiple spins at the same time
    setIsSpinning(true);

    // Randomly select a player after spin ends
    const spinDuration = 3000; // 3 seconds for spinning
    const randomPlayerIndex = Math.floor(Math.random() * players.length);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPlayer(players[randomPlayerIndex]);
      onSelected(players[randomPlayerIndex]); // Notify parent component
    }, spinDuration);
  };

  return (
    <div className="spinner-container">
      <div className={`spinner ${isSpinning ? 'spinning' : ''}`}>
        {players.map((player, index) => (
          <div key={index} className="spinner-segment">
            {player}
          </div>
        ))}
      </div>

      <button onClick={spinWheel} disabled={isSpinning}>
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>

      {selectedPlayer && <p>Selected Player: {selectedPlayer}</p>}

      <style jsx>{`
        .spinner-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }

        .spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 200px;
          height: 200px;
          border: 4px solid #333;
          border-radius: 50%;
          position: relative;
          transition: transform 3s ease-out;
        }

        .spinning {
          transform: rotate(${360 * 6}deg); /* 6 full spins */
        }

        .spinner-segment {
          position: absolute;
          text-align: center;
          font-size: 16px;
          font-weight: bold;
        }

        .spinner-segment:nth-child(1) {
          top: 10%;
        }

        .spinner-segment:nth-child(2) {
          top: 50%;
          left: 80%;
        }

        .spinner-segment:nth-child(3) {
          top: 80%;
        }

        .spinner-segment:nth-child(4) {
          top: 50%;
          left: 10%;
        }

        button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:disabled {
          background-color: gray;
        }
      `}</style>
    </div>
  );
};

export default Spinner;
