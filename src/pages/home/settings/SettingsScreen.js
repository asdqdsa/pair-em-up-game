import { createElement } from '@/shared/dom/create-element';
import { EVENTS } from '@/shared/event/events';
import { UIButton } from '@/shared/uikit/components/UIButton';

import { UI_COMMANDS } from '../start/constants';

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
      title: `${UI_COMMANDS.BACK_TO_MENU.title}`,
      onClick: () =>
        events.emit(EVENTS.UI_MENU_ACTION, UI_COMMANDS.BACK_TO_MENU.action),
      children: `${UI_COMMANDS.BACK_TO_MENU.label}`,
    })
  );

  return el;
}
