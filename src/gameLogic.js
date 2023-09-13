// gameLogic.js
const phrases = [
    'We design and develop applications',
    'that run the world and',
    'showcase the future',
  ];
  
 export let intervalId = null;
let currentWordIndex = 0;

function generateBlock() {
  const words = phrases.join(' ').split(' ');
  const randomWord = words[currentWordIndex];
  currentWordIndex = (currentWordIndex + 1) % words.length;
  return {
    id: Date.now(),
    text: randomWord,
    position: { x: Math.floor(Math.random() * 10), y: 0 },
  };
}

export function startGame(updateStateCallback) {
  const initialState = {
    blocks: [],
    score: 0,
    gameOver: false,
  };

  let gameState = { ...initialState };

  intervalId = setInterval(() => {
    if (!gameState.gameOver) {
      const lastBlock = gameState.blocks[gameState.blocks.length - 1];
      if (lastBlock && lastBlock.position.y >= 9) {
        // Word block has reached the bottom, stop it from falling further
        lastBlock.position.y = 9;
      } else {
        gameState.blocks.push(generateBlock());
      }
      updateStateCallback(gameState);
    }
  }, 1000);
}
  export function updateBlockPositions(gameState, updateStateCallback) {
    if (!gameState.gameOver) {
      gameState.blocks = gameState.blocks.map((block) => ({
        ...block,
        position: { x: block.position.x, y: block.position.y + 1 },
      }));
      updateStateCallback({ ...gameState });
    }
  }
  