import { events } from '@/shared/event/event-broker';
import { APP_EVENTS } from '@/shared/event/events';

import { GAME_STATUS } from '../constants';
import { gameState } from '../state/runtimeState';
import { loadGameSnapshot } from '../storage/storage';

export function continueGame(savedGame = '') {
  const saved = loadGameSnapshot();
  if (!saved) return;

  Object.assign(gameState, saved);

  if (gameState.timerRef) clearInterval(gameState.timerRef);

  gameState.timerRef = setInterval(() => {
    gameState.elapsedSeconds += 1;
    events.emit(APP_EVENTS.GAME_UPDATED, null);
  }, 1000);

  gameState.status = GAME_STATUS.IN_PROGRESS;
}
