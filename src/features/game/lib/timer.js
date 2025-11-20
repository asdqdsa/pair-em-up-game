import { APP_EVENTS } from '@/shared/event/events';

import { gameState } from '../state/runtimeState';

let timerId = null;

export function startGameTimer(events) {
  if (timerId !== null) {
    clearInterval(timerId);
  }

  timerId = setInterval(() => {
    gameState.elapsedSeconds += 1;

    events.emit(APP_EVENTS.GAME_TICK, {
      type: APP_EVENTS.GAME_TICK,
      payload: gameState.elapsedSeconds,
    });
  }, 1000);
}

export function stopGameTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}
