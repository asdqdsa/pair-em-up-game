import { APP_EVENTS } from '@/shared/event/events';
import { events } from '@/shared/event/event-broker';
import { sleep } from '@/shared/utils/async/sleep';

import { GRID_EVENTS } from './constants';
import { generateGameGrid } from './grid/generate';
import { gameState } from './state';

export async function handleCellClick({ payload }) {
  //  {key: 21, value: '1'}
  const { key, value } = payload;

  if (!value) return;

  if (gameState.selectedCells.length === 0) {
    gameState.selectedCells.push(key);
    console.log('selectedCells2', gameState.selectedCells);
    events.emit(APP_EVENTS.GAME_UPDATED, null);
    return;
  }

  if (gameState.selectedCells.length === 1) {
    const firstCellKey = gameState.selectedCells[0];

    if (firstCellKey == key) {
      gameState.selectedCells = [];
      events.emit(APP_EVENTS.GAME_UPDATED, null);
      return;
    }

    gameState.selectedCells.push(key);

    // repain with seconds cell
    events.emit(APP_EVENTS.GAME_UPDATED, null);

    await sleep(500);

    const isValidPair = checkPair(
      gameState.selectedCells[0],
      gameState.selectedCells[1]
    );

    if (isValidPair) {
      console.log('PAIR IS VALID', isValidPair);
    }

    if (!isValidPair) {
      console.log('PAIR IS WRONG', isValidPair);
    }

    gameState.selectedCells = [];
    events.emit(APP_EVENTS.GAME_UPDATED, null);

    return;
  }

  gameState.selectedCells = [key];
  events.emit(APP_EVENTS.GAME_UPDATED, null);
}

function checkPair(a, b) {
  // TODO: validate match rule
  // TODO: call BFS
  // TODO: update grid
  console.log('Pair checked', a, b);
  return Math.random() > 0.5;
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
