import React, { useState, useEffect } from 'react';
import './App.css';
import { startGame, updateBlockPositions, intervalId } from './gameLogic';

function App() {
  const [gameState, setGameState] = useState({
    blocks: [],
    currentPhraseIndex: 0,
    score: 0,
    gameOver: false,
  });

  useEffect(() => {
    startGame(setGameState);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateBlockPositions(gameState, setGameState);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [gameState]);

  const handleKeyDown = (e) => {
    if (e.keyCode === 37) {
      moveBlocks('left');
    } else if (e.keyCode === 39) {
      moveBlocks('right');
    }
  };

  const moveBlocks = (direction) => {
    if (!gameState.gameOver) {
      const updatedBlocks = gameState.blocks.map((block) => {
        let newPosition = { ...block.position };
        if (direction === 'left') {
          newPosition.x = Math.max(0, newPosition.x - 1);
        } else if (direction === 'right') {
          newPosition.x = Math.min(9, newPosition.x + 1);
        }
        return { ...block, position: newPosition };
      });

      gameState.blocks = updatedBlocks;
      setGameState({ ...gameState });
    }
  };

  return (
    <div className="App">
      <h1>Word Block Game</h1>
      <div className="game-container">
        <div className="game-field">
          {gameState.blocks &&
            gameState.blocks.map((block) => (
              <div
                key={block.id}
                className="block"
                style={{
                  left: `${block.position.x * 40}px`,
                  top: `${block.position.y * 40}px`,
                  transition: 'top 1s, left 1s',
                }}
              >
                {block.text}
              </div>
            ))}
        </div>
        <div className="score">Score: {gameState.score || 0}</div>
        {gameState.gameOver && <div className="game-over">Game Over</div>}
      </div>
    </div>
  );
}

export default App;
