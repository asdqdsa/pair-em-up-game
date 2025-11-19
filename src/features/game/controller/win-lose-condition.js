import { MAX_LEN, MAX_ROWS } from '../constants';
import { arePairsPresent } from '../lib/grid-utils';
import { gameState } from '../state/runtimeState';

export function winConditionsMet() {
  return gameState.score >= gameState.maxScore;
}

export function loseConditionsMet() {
  const list = gameState.grid;

  const noPairsExist = !arePairsPresent({ list });

  const noAssistsExist =
    gameState.eraseCellLeft <= 0 &&
    gameState.hintsLeft <= 0 &&
    gameState.undoMovesLeft <= 0 &&
    gameState.shufflesLeft <= 0 &&
    gameState.revertMovesLeft <= 0;

  const gridLimitReached =
    Math.ceil(gameState.grid.length / MAX_LEN) >= MAX_ROWS;

  // TODO add 50 row/line limit
  return (noPairsExist && noAssistsExist) || gridLimitReached;
}
