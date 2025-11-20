import { GAME_MODES, GRID_LIMIT, GAME_STATUS, ROW_LEN } from '../constants';
import { gameState } from '../state/runtimeState';

export function assistAddNumbers({ mode }) {
  if (mode === GAME_MODES.CHAOTIC) {
    const aliveCells = gameState.grid.filter((cell) => cell != null).length;

    const tail = Array.from(
      { length: aliveCells },
      () => Math.floor(Math.random() * 9) + 1
    );

    if (GRID_LIMIT < gameState.grid.length + tail.length) {
      gameState.status = GAME_STATUS.LOSS;
      return;
    }

    const head = gameState.grid;
    gameState.grid = head.concat(tail);
  } else {
    const tail = gameState.fullGrid.slice(
      gameState.visibleLength,
      gameState.visibleLength + ROW_LEN
    );

    const head = gameState.grid;
    gameState.grid = head.concat(tail);

    gameState.visibleLength += tail.length;
  }
}
