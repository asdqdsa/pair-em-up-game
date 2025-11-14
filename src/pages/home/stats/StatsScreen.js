import { createElement } from '@/shared/dom/create-element';
import { UIButton } from '@/shared/uikit/components/UIButton';
import { APP_EVENTS } from '@/shared/event/events';

import { MENU_ACTIONS } from '../start/menu-actions';

export function StatsScreen({ events }) {
  const el = createElement(
    'div',
    { className: 'stats-screen' },
    createElement('h1', { className: 'stats-screen__title' }, 'Stats'),
    createElement('div', { className: 'stats-screen__content' }, 'Content'),
    UIButton({
      className: 'btn',
      id: 'back-to-menu-btn',
      title: `${MENU_ACTIONS.BACK_TO_MENU.title}`,
      onClick: () =>
        events.emit(
          APP_EVENTS.UI_MENU_ACTION,
          MENU_ACTIONS.BACK_TO_MENU.action
        ),
      children: `${MENU_ACTIONS.BACK_TO_MENU.label}`,
    })
  );

  return el;
}
