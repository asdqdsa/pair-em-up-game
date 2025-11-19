import { GAME_STATUS } from './constants';

export const gameState = {
  // generated grid
  grid: [],

  // classic random etc
  mode: null,

  // deprecated
  firstSelected: null,

  // need for toggle logic
  selectedCells: [],

  // game overall score
  score: 0,

  // defeault is ??
  movesLeft: 50,

  // GAME_STATUS
  status: null,

  // Default is 100
  maxScore: 100,

  // time spent
  elapsedSeconds: 0,

  // Date.now()
  startTime: null,

  // timerIDref
  timerRef: null,
};
