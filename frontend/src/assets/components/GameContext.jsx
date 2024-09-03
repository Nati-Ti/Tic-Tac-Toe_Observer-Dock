import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);

  const updateScore = (player, score) => {
    if (player === 'X') {
      setPlayerOneScore(score);
    } else if (player === 'O') {
      setPlayerTwoScore(score);
    }
  };

  return (
    <GameContext.Provider value={{ playerOneScore, playerTwoScore, updateScore }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('context error!');
  }
  return context;
};
