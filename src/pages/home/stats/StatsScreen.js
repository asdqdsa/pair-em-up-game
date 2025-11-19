import { createElement } from '@/shared/dom/create-element';
import { UIButton } from '@/shared/uikit/components/UIButton';
import { APP_EVENTS } from '@/shared/event/events';
import { GAME_STATUS } from '@/features/game/constants';
import { gameState } from '@/features/game/state';
import { formatTime } from '@/shared/utils/lib';

import { MENU_ACTIONS } from '../start/menu-actions';

export function StatsScreen({ events }) {
  console.log('StatsScreen STATUS', gameState.status);
  const statusText =
    gameState.status === GAME_STATUS.WIN ? 'You win!' : 'You lose :D';

  const title = createElement('h1', { className: 'stats-screen__title' });

  const content = createElement(
    'div',
    { className: 'stats-screen__content' },
    createElement(
      'h1',
      { className: 'stats-screen__title' },

      `${statusText}`
    ),
    createElement(
      'div',
      { className: 'stats-screen__content' },

      createElement('p', {}, ``),
      createElement(
        'p',
        {},
        `Your score: ${gameState.score} / ${gameState.maxScore}`,
        ` `,
        `Time: ${formatTime(gameState.elapsedSeconds)}`
      )
    )
  );

  const container = createElement(
    'div',
    { className: 'stats-screen__content' },
    content
  );

  const confirmButton = UIButton({
    className: 'btn',
    id: 'back-to-menu-btn',
    title: `${MENU_ACTIONS.BACK_TO_MENU.title}`,
    onClick: () =>
      events.emit(APP_EVENTS.UI_MENU_ACTION, MENU_ACTIONS.BACK_TO_MENU.action),
    children: `${MENU_ACTIONS.BACK_TO_MENU.label}`,
  });

  const el = createElement(
    'div',
    { className: 'stats-screen' },
    // title,
    container,
    confirmButton
  );

  return el;
}
