import { useState } from 'react';
import Spinner from '../../components/Spinner';

const Room = () => {
  const [players, setPlayers] = useState(['Player 1', 'Player 2', 'Player 3']);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  // Handle what happens when a player is selected from the spinner
  const handleSelectedPlayer = (player) => {
    setCurrentPlayer(player);
    // Proceed to asking truth or dare, etc.
  };

  return (
    <div>
      <h1>Truth or Dare Room</h1>

      {/* Spinner for selecting the player */}
      <Spinner players={players} onSelected={handleSelectedPlayer} />

      {currentPlayer && (
        <div>
          <h2>{currentPlayer} has been selected!</h2>
          {/* You can now ask the player "Truth or Dare?" */}
        </div>
      )}
    </div>
  );
};

export default Room;
