import { APP_EVENTS } from '@/shared/event/events';
import { events } from '@/shared/event/event-broker';
import { sleep } from '@/shared/utils/async/sleep';

import { GAME_STATUS, GRID_EVENTS } from './constants';
import { generateGameGrid } from './grid/generate';
import { gameState } from './state';
import { checkPair } from './utils';

export async function handleCellClick({ payload }) {
  if (gameState.status !== GAME_STATUS.IN_PROGRESS) return;

  // gameState.status = GAME_STATUS.IN_PROGRESS;

  //  {key: 21, value: '1'}
  const { key, value } = payload;

  if (value === null) {
    events.emit(APP_EVENTS.GAME_UPDATED, null);
    return;
  }

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

    await sleep(200);

    const pairScore = checkPair(
      // firstCellKey,
      gameState.selectedCells[0],
      // key
      gameState.selectedCells[1],
      gameState.grid
    );

    if (pairScore > 0) {
      console.log('PAIR IS VALID', pairScore);
      gameState.score += pairScore != null || pairScore > 0 ? pairScore : 0;

      gameState.movesLeft -= 1;
      gameState.grid[key] = null;
      gameState.grid[firstCellKey] = null;
    }

    if (pairScore === 0) {
      console.log('PAIR IS WRONG', pairScore);
      gameState.movesLeft -= 1;
    }

    gameState.selectedCells = [];
    events.emit(APP_EVENTS.GAME_UPDATED, null);

    if (winConditionsMet()) {
      console.log('WIN CONDITIONS MET');
      gameState.status = GAME_STATUS.WIN;
      clearInterval(gameState.timerRef);
      events.emit(APP_EVENTS.GAME_END, null);
    }

    if (loseConditionsMet()) {
      console.log('LOSE CONDITIONS MET');
      gameState.status = GAME_STATUS.LOSS;
      clearInterval(gameState.timerRef);
      events.emit(APP_EVENTS.GAME_END, null);
    }

    return;
  }

  gameState.selectedCells = [key];
  events.emit(APP_EVENTS.GAME_UPDATED, null);
}

export function winConditionsMet() {
  return gameState.score >= gameState.maxScore;
}

export function loseConditionsMet() {
  const list = gameState.grid;

  if (gameState.movesLeft <= 0) {
    return true;
  }

  for (let i = 0; i < list.length; i += 1) {
    for (let j = i + 1; j < list.length; j += 1) {
      const score = checkPair(i, j, list);
      console.log('pair i, j', i, j, score);
      if (score > 0) {
        return false;
      }
    }
  }
  // TODO add 50 row/line limit
  return true;
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
  gameState.selectedCells = [];
  gameState.status = GAME_STATUS.IN_PROGRESS;
  gameState.maxScore = 100;
  gameState.movesLeft = 50;

  gameState.elapsedSeconds = 0;
  if (gameState.timerRef) {
    clearInterval(gameState.timerRef);
    gameState.timerRef = null;
  }

  gameState.timerRef = setInterval(() => {
    gameState.elapsedSeconds += 1;
    // events.emit(APP_EVENTS.GAME_UPDATED, null);
  }, 1000);
}

export function continueGame({}) {
  // loadStorage
}

export function saveGame() {
  // saveStorage
}
