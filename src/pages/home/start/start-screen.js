import { createElement } from '@/shared/dom/create-element';
import { APP_EVENTS } from '@/shared/event/events';
import { UIButton } from '@/shared/uikit/components/UIButton';

import { MENU_ACTIONS } from './menu-actions';
import { MENU_TEXT } from './menu-text';

export function StartScreen({ events }) {
  return createElement(
    'div',
    { className: 'flex flex-col gap-2 justify-center h-full' },
    StartScreenGameModes({ events }),
    StartScreenControlls({ events }),
    UIButton({
      key: `btn-${MENU_TEXT.BUTTONS.STATS.toLowerCase()}`,
      className: 'btn flex flex-col items-center justify-center',
      onClick: () =>
        events.emit(APP_EVENTS.UI_MENU_ACTION, MENU_ACTIONS.STATS.action),
      children: MENU_TEXT.BUTTONS.STATS,
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
      MENU_TEXT.TITLE
    ),
    ...MENU_ACTIONS.MODES.map(({ action }) => {
      return createElement(
        'div',
        {
          'data-key': `mode-${MENU_TEXT.MODES[action.payload].toLowerCase()}`,
          className: 'btn flex flex-col items-center justify-center',
          onClick: () => events.emit(APP_EVENTS.UI_MENU_ACTION, action),
        },
        MENU_TEXT.MODES[action.payload]
      );
    }),

    createElement(
      'div',
      {
        className: 'ty-body-italic text-right',
      },
      `*${MENU_TEXT.TIP.toLowerCase()}`
    )
  );
}

export function StartScreenControlls({ events }) {
  const continueBtn = createElement(
    'div',
    {
      'data-key': `mode-${MENU_ACTIONS.CONTINUE.label.toLowerCase()}`,
      className: 'btn',
      onClick: () =>
        events.emit(APP_EVENTS.UI_MENU_ACTION, MENU_ACTIONS.CONTINUE.action),
    },

    `${MENU_TEXT.BUTTONS.CONTINUE}`
  );
  const settingsBtn = createElement(
    'div',
    {
      'data-key': `mode-${MENU_ACTIONS.SETTINGS.label.toLowerCase()}`,
      className: 'btn',
      onClick: () =>
        events.emit(APP_EVENTS.UI_MENU_ACTION, MENU_ACTIONS.SETTINGS.action),
    },

    `${MENU_TEXT.BUTTONS.SETTINGS}`
  );

  const el = createElement(
    'div',
    { className: 'flex flex-row justify-end gap-2 mt-30' },
    true && continueBtn,
    settingsBtn
  );

  return el;
}
