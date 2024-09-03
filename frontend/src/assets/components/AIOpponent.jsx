import { useEffect } from 'react';

const AIOpponent = ({ board, xIsNext, winner, makeAIMove }) => {
  useEffect(() => {
    if (!winner && !xIsNext) { 
      
      const availableSpots = [];
      board.forEach((square, index) => {
        if (square === null) {
          availableSpots.push(index);
        }
      });
      if (availableSpots.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableSpots.length);
        makeAIMove(availableSpots[randomIndex]);
      }
    }
  }, [board, xIsNext, winner, makeAIMove]);

  return null;
};

export default AIOpponent;
