import React from 'react';
import './GameModeSelection.css';

const GameModeSelection = ({ onSelectMode }) => {
  return (
    <div className="game-mode-selection">
      <div className="modal">
        <div className='welcome'><h1>Welcome to Tic-Tac-Toe!</h1></div>
        <h2>Choose Game Mode:</h2>
        <div className='mode_buttons'>
          <button onClick={() => onSelectMode('multiplayer')}>Multiplayer</button>
          <button onClick={() => onSelectMode('againstAI')}>Versus Computer</button>
        </div>
      </div>
    </div>
  );
};

export default GameModeSelection;
