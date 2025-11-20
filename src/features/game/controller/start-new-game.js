import { events } from '@/shared/event/event-broker';
import { APP_EVENTS } from '@/shared/event/events';

import { DEFAULT_STATE } from '../state/defaults';
import { gameState } from '../state/runtimeState';
import { generateGameGrid } from '../lib/grid-utils';
import { INITIAL_GRID_LENGTH, ROW_LEN } from '../constants';

export function startNewGame({ mode }) {
  Object.assign(gameState, DEFAULT_STATE());

  gameState.fullGrid = generateGameGrid({ mode });
  gameState.visibleLength = INITIAL_GRID_LENGTH;
  gameState.grid = gameState.fullGrid.slice(0, gameState.visibleLength);

  gameState.mode = mode;

  if (gameState.timerRef) {
    clearInterval(gameState.timerRef);
    gameState.timerRef = null;
  }

  gameState.timerRef = setInterval(() => {
    gameState.elapsedSeconds += 1;
    events.emit(APP_EVENTS.GAME_UPDATED, null);
  }, 1000);
}

export function addNumbers() {
  const tail = gameState.fullGrid.slice(
    gameState.visibleLength,
    gameState.visibleLength + ROW_LEN
  );

  const head = gameState.grid;
  gameState.grid = head.concat(tail);

  gameState.visibleLength += tail.length;
}
