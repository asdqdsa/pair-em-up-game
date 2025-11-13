import { createElement } from '@/shared/dom/create-element';
import { EVENTS } from '@/shared/event/events';

import { UI_COMMANDS } from '../start/constants';

export function GameScreen({ events }) {
  return createElement(
    'div',
    {
      id: 'start-screen',
      className: 'flex flex-col items-center justify-center h-full',
      onClick: () =>
        events.emit(EVENTS.UI_MENU_ACTION, UI_COMMANDS.BACK_TO_MENU.action),
    },
    `${UI_COMMANDS.BACK_TO_MENU.label}`
  );
}
