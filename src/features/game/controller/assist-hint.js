import { APP_EVENTS } from '@/shared/event/events';
import { events } from '@/shared/event/event-broker';

import { countPairs } from '../logic/count-pairs';
import { gameState } from '../state/runtimeState';

export function assistHint() {
  console.log('Assist Hint', gameState.hintsLeft);
  if (gameState.hintsLeft <= 0) return;

  gameState.hintsLeft -= 1;
  gameState.avaliablePairs = countPairs(gameState.grid);
  events.emit(APP_EVENTS.GAME_UPDATED);
}
