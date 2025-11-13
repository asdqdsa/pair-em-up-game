import { createElement } from '@/shared/dom/create-element';
import { UIButton } from '@/shared/uikit/components/UIButton';
import { EVENTS } from '@/shared/event/events';

import { UI_COMMANDS } from '../start/constants';

export function StatsScreen({ events }) {
  const el = createElement(
    'div',
    { className: 'stats-screen' },
    createElement('h1', { className: 'stats-screen__title' }, 'Stats'),
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
