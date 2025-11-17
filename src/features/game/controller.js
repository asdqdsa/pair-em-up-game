import { APP_EVENTS } from '@/shared/event/events';
import { events } from '@/shared/event/event-broker';

import { GRID_EVENTS } from './constants';
import { generateGameGrid } from './grid/generate';
import { gameState } from './state';

export function handleCellClick({ payload }) {
  const { key, value } = payload;
  console.log('Cell clicked', key, value);

  if (!value) return;

  // if (gameState.firstSelected === null) {
  //   gameState.firstSelected = key;
  //   events.emit(APP_EVENTS.GAME_UPDATED, null);
  //   return;
  // }
  //
  if (gameState.selectedCells.includes(key)) {
    gameState.selectedCells = [];
    events.emit(APP_EVENTS.GAME_UPDATED, null);
    return;
  }

  if (gameState.selectedCells.length === 0) {
    gameState.selectedCells.push(key);
    events.emit(APP_EVENTS.GAME_UPDATED, null);
    return;
  }

  if (gameState.selectedCells.length === 1) {
    gameState.selectedCells.push(key);
    events.emit(APP_EVENTS.GAME_UPDATED, null);

    checkPair(gameState.selectedCells[0], gameState.selectedCells[1]);

    gameState.selectedCells = [];

    events.emit(APP_EVENTS.GAME_UPDATED, null);
    return;
  }

  // const a = gameState.firstSelected;
  // const b = key;

  // gameState.firstSelected = null;

  // events.emit(APP_EVENTS.GAME_UPDATED, null);
  // checkPair(a, b);
}

function checkPair(a, b) {
  // TODO: validate match rule
  // TODO: call BFS
  // TODO: update grid
  console.log('Pair checked', a, b);
}

export function handleGameAction({ type, payload, events }) {
  console.log('Game action', type, payload);

  switch (type) {
    case GRID_EVENTS.UI_CELL_CLICKED: {
      handleCellClick({ payload });
      break;
    }

    default:
      console.log(`Unhandled action type: ${type}`);
      break;
  }
}

export function startNewGame({ mode }) {
  gameState.grid = generateGameGrid({ mode });
  gameState.mode = mode;
  gameState.score = 0;
  gameState.firstSelected = null;
  console.log('New game started');
}
