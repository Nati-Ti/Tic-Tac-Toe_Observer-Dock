import React from 'react';
import { useGameContext } from './GameContext';

const GameStats = () => {
  const { playerOneScore, playerTwoScore } = useGameContext();

  return (
    <div className="game-stats">
      <div className="player-stats" style={{ color: '#ff0000' }}>
        Player One Score: {playerOneScore}
      </div>
      <div className="player-stats" style={{ color: '#0000ff' }}>
        Player Two Score: {playerTwoScore}
      </div>
    </div>
  );
};

export default GameStats;
