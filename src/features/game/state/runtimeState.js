/** @typedef {import('./types').GameState} GameState */

// import { loadGameSnapshot, saveGameSnapshot } from '../storage/storage';

/** @type GameState */
export const gameState = {
  grid: [],
  fullGrid: [],
  visibleLength: 0,
  mode: null,
  selectedCells: [],
  score: 0,
  status: null,
  maxScore: 0,
  elapsedSeconds: 0,
  startTime: null,

  movesCount: 0,

  timerRef: null,

  hintsLeft: 0,
  undoMovesLeft: 0,
  shufflesLeft: 0,
  eraseCellLeft: 0,
  revertMovesLeft: 1,

  avaliablePairs: 0,
};

// function initGameState() {
//   /** @type GameState */
//   const initGameState = gameState;
//   saveGameSnapshot(initGameState);
//   return initGameState;
// }

// export function loadGameState() {
//   const stale = loadGameSnapshot();
//   const fresh = stale ? { ...stale, isFirstLoad: false } : initGameState();
//   return fresh;
// }

// export function updateGameState({ state }) {
//   const stale = loadGameState();
//   const fresh = { ...stale, state };
//   saveGameSnapshot(fresh);
//   return fresh;
// }
