import { createElement } from '@/shared/dom/create-element';
import { APP_EVENTS } from '@/shared/event/events';
import { UIButton } from '@/shared/uikit/components/UIButton';

import { GAME_ACTIONS } from '../constants';
import { gameState } from '../state/runtimeState';

export function AssistToolbar({ events, mode }) {
  const el = createElement(
    'div',
    { className: 'flex flex-col gap-2 w-full' },

    UIButton({
      className: 'btn',
      onClick: () => {
        events.emit(APP_EVENTS.UI_GAME_ACTION, {
          type: GAME_ACTIONS.ASSIST_ADD_NUMBERS,
          payload: mode,
        });
        events.emit(APP_EVENTS.GAME_UPDATED, null);
      },
      children: 'Add numbers',
    }),

    UIButton({
      className: `${gameState.hintsLeft > 0 ? 'btn' : 'btn disabled'}`,
      onClick: () =>
        events.emit(APP_EVENTS.UI_GAME_ACTION, {
          type: GAME_ACTIONS.ASSIST_HINT,
        }),
      children: `Hints left (${gameState.hintsLeft})
         Possible connections ${gameState.avaliablePairs === 0 ? '?' : gameState.avaliablePairs}`,
    }),

    UIButton({
      className: 'btn ',
      onClick: () =>
        events.emit(APP_EVENTS.UI_GAME_ACTION, {
          type: GAME_ACTIONS.ASSIST_UNDO,
        }),
      children: `Undo`,
    }),

    UIButton({
      className: 'btn',
      onClick: () =>
        events.emit(APP_EVENTS.UI_GAME_ACTION, {
          type: GAME_ACTIONS.ASSIST_SHUFFLE,
        }),
      children: `Shuffle (${gameState.shufflesLeft})`,
    }),

    UIButton({
      className: 'btn ',
      onClick: () =>
        events.emit(APP_EVENTS.UI_GAME_ACTION, {
          type: GAME_ACTIONS.ASSIST_ERASE,
        }),
      children: `Erase (${gameState.eraseCellLeft})`,
    })
  );

  return el;
}
