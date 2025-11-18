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
  movesLeft: 3,
  status: null,
  maxScore: 100,
};
