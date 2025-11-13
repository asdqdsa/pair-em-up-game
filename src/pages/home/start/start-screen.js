import { createElement } from '@/shared/dom/create-element';
import { EVENTS } from '@/shared/event/events';
import { UIButton } from '@/shared/uikit/components/UIButton';

import { UI_COMMANDS } from './constants';

export function StartScreen({ events }) {
  return createElement(
    'div',
    { className: 'flex flex-col gap-2 justify-center h-full' },
    StartScreenGameModes({ events }),
    StartScreenControlls({ events }),
    UIButton({
      key: `btn-${UI_COMMANDS.STATS.label.toLowerCase()}`,
      className: 'btn flex flex-col items-center justify-center',
      onClick: () =>
        events.emit(EVENTS.UI_MENU_ACTION, UI_COMMANDS.STATS.action),
      children: UI_COMMANDS.STATS.label,
    })
  );
}

export function StartScreenGameModes({ events }) {
  return createElement(
    'div',
    { className: 'flex flex-col gap-2 justify-center' },
    createElement(
      'div',
      {
        className: 'ty-h1',
      },
      UI_COMMANDS.TITLE
    ),
    ...UI_COMMANDS.MODES.map((entry) => {
      return createElement(
        'div',
        {
          'data-key': `mode-${entry.label.toLowerCase()}`,
          className: 'btn flex flex-col items-center justify-center',
          onClick: () => events.emit(EVENTS.UI_MENU_ACTION, entry.action),
        },
        entry.label
      );
    }),

    createElement(
      'div',
      {
        className: 'ty-body-italic text-right',
      },
      `*${UI_COMMANDS.TIP.toLowerCase()}`
    )
  );
}

export function StartScreenControlls({ events }) {
  const continueBtn = createElement(
    'div',
    {
      'data-key': `mode-${UI_COMMANDS.CONTINUE.label.toLowerCase()}`,
      className: 'btn',
      onClick: () =>
        events.emit(EVENTS.UI_MENU_ACTION, UI_COMMANDS.CONTINUE.action),
    },

    `${UI_COMMANDS.CONTINUE.label}`
  );
  const settingsBtn = createElement(
    'div',
    {
      'data-key': `mode-${UI_COMMANDS.SETTINGS.label.toLowerCase()}`,
      className: 'btn',
      onClick: () =>
        events.emit(EVENTS.UI_MENU_ACTION, UI_COMMANDS.SETTINGS.action),
    },

    `${UI_COMMANDS.SETTINGS.label}`
  );

  const el = createElement(
    'div',
    { className: 'flex flex-row justify-end gap-2 mt-30' },
    true && continueBtn,
    settingsBtn
  );

  return el;
}
