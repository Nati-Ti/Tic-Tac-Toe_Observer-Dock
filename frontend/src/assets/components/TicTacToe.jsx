import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import GameModeSelection from './GameModeSelection';
import AIOpponent from './AIOpponent';
import GameStats from './GameStats';
import { useGameContext } from './GameContext';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [showGameModeSelection, setShowGameModeSelection] = useState(true);
  const [selectedGameMode, setSelectedGameMode] = useState(null);
  const { playerOneScore, playerTwoScore, updateScore } = useGameContext();
  const status = winner ? `Winner: ${winner}` : `Next move: ${xIsNext ? 'Player - X' : 'Player - O'}`;


  useEffect(() => {
    if (showResetMessage) {
      const timeout = setTimeout(() => {
        resetGame();
        setShowResetMessage(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showResetMessage]);

  useEffect(() => {
    if (selectedGameMode) {
      setGameStarted(true);
      setShowGameModeSelection(false);
    }
  }, [selectedGameMode]);

  // const checkWinningCondition = (winner) => {
  //   return winner === 'X' ? playerOneScore === 2 : playerTwoScore === 2;
  // };
  const handleClick = async (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    try {
        const response = await fetch('http://127.0.0.1:5000/move', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index }),
        });

        const data = await response.json();

        console.log('Response Data:', data);

        if (data && data.board !== undefined) {
            setBoard(data.board);
            setWinner(data.winner);
            setXIsNext(data.xIsNext);

            if (data.winner) {
                await updateScores(data.winner);
                setShowResetMessage(true);
                if (data.message) {
                    congratulateWinner(data.message); 
                }
            } else if (!data.board.includes(null)) {
                setShowResetMessage(true);
            }
        } else {
            console.error('Unexpected data format:', data);
        }
    } catch (error) {
        console.error('Error fetching move:', error);
    }
};


  const congratulateWinner = (message) => {
    alert(`🎉🎉🎉 ${message}`);
    resetGame();
    setSelectedGameMode(null);
    setShowGameModeSelection(true);
    setGameStarted(false);
  };


  const updateScores = async (winner) => {
    let updatedScore;
    if (winner === 'X') {
      updatedScore = playerOneScore + 1;
      updateScore('X', updatedScore);
    } else if (winner === 'O') {
      updatedScore = playerTwoScore + 1;
      updateScore('O', updatedScore);
    }

    await fetch('http://127.0.0.1:5000/update_scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ winner, score: updatedScore }),
    });
  };

  const resetGame = async () => {
    const response = await fetch('http://127.0.0.1:5000/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    setBoard(data.board);
    setXIsNext(data.xIsNext);
    setWinner(data.winner);
    setShowResetMessage(false);
};

  const resetGameScores = () => {
    updateScore('X', 0);
    updateScore('O', 0);
  };

  const handleGameModeSelection = (mode) => {
    setSelectedGameMode(mode);
    resetGame();
    resetGameScores();
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  return (
    <div className="game">
      {showGameModeSelection && <GameModeSelection onSelectMode={handleGameModeSelection} />}
      {gameStarted && (
        <div className="game-container">
          <h1>Tic-Tac-Toe</h1>
          <div className="game-board">
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
          <div className="game-info">{status}</div>
          <GameStats />
          {showResetMessage && <div className="reset-message">The game will restart in 3 seconds.</div>}
          <button className="reset-button" onClick={resetGame}>
            Reset
          </button>
          {selectedGameMode === 'againstAI' && (
            <AIOpponent board={board} xIsNext={xIsNext} winner={winner} makeAIMove={handleClick} />
          )}
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
