import { createElement } from '@/shared/dom/create-element';
import { APP_EVENTS } from '@/shared/event/events';
import { UIButton } from '@/shared/uikit/components/UIButton';

import { MENU_ACTIONS } from '../start/menu-actions';

export function SettingsScreen({ events }) {
  const el = createElement(
    'div',
    {
      className: 'flex flex-col items-center justify-center',
    },
    createElement('h1', { className: 'stats-screen__title' }, 'Settings'),
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
