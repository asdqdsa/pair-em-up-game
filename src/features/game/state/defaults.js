import { GAME_STATUS } from '../constants';

/**
 * @returns {import("./types").GameState}
 */
export const DEFAULT_STATE = () => ({
  grid: [],
  mode: null,

  selectedCells: [],

  score: 0,

  status: GAME_STATUS.IN_PROGRESS,
  maxScore: 100,

  elapsedSeconds: 0,
  timerRef: null,

  startTime: null,

  movesCount: 0,

  hintsLeft: 5,
  undoMovesLeft: 5,
  shufflesLeft: 5,
  eraseCellLeft: 5,
  revertMovesLeft: 1,
});
