import { events } from '@/shared/event/event-broker';
import { APP_EVENTS } from '@/shared/event/events';
import { sleep } from '@/shared/utils/async/sleep';

import { GAME_STATUS } from '../constants';
import { checkPair } from '../lib/grid-utils';
import { gameState } from '../state/runtimeState';
import {
  loseConditionsMet,
  winConditionsMet,
} from '../logic/win-lose-condition';

export async function handleCellClick({ payload }) {
  if (gameState.status !== GAME_STATUS.IN_PROGRESS) return;

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

      gameState.movesCount += 1;
      gameState.grid[key] = null;
      gameState.grid[firstCellKey] = null;
    }

    if (pairScore === 0) {
      console.log('PAIR IS WRONG', pairScore);
      gameState.movesCount += 1;
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
