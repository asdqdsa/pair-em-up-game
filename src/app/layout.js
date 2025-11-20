import { ThemeButton } from '@/features/theme-switcher';
import { LanguageButton } from '@/features/lang-switcher';
import { createElement } from '@/shared/dom/create-element';
import { render } from '@/shared/dom/render';
import { UIButton } from '@/shared/uikit/components/UIButton';
import { APP_EVENTS } from '@/shared/event/events';
import { MENU_ACTIONS } from '@/pages/home/start/menu-actions';

import { initRouter } from './router';
import { appCtx } from './context/context';
import { ROUTER_ACTIONS, SCREENS } from './screens';

export function App({ events }) {
  // const header = Header({ events });
  const main = Main({ events });
  // const footer = Footer({ events });
  const headerRoot = createElement('header', { className: 'w-full' });
  const footerRoot = createElement('footer', {});

  render(() => Header({ events }), headerRoot);
  render(() => Footer({ events }), footerRoot);

  const app = createElement(
    'div',
    {
      className: 'flex flex-col flex-1 h-full items-center',
      id: 'app',
    },
    headerRoot,
    main,
    footerRoot
  );

  initRouter({ events, root: main, headerRoot });
  return app;
}

export function Header({ events }) {
  const { currScreen } = appCtx.get();
  console.log('Header', currScreen);

  const isStart = currScreen === SCREENS.START || currScreen === null;

  const el = createElement(
    'div',
    { className: 'header my-10 ty-body w-full gap-2 flex justify-end' },
    ThemeButton({ events, className: 'btn-md' }),
    isStart && LanguageButton({ events, className: 'btn-md' }),
    !isStart &&
      UIButton({
        // disabled: isStart,
        // className: `${isStart ? 'btn-md disabled' : 'btn-md'}`,
        className: 'btn-md',
        onClick: () => {
          events.emit(
            APP_EVENTS.UI_MENU_ACTION,
            MENU_ACTIONS.BACK_TO_MENU.action
          );
        },
        children: 'Back',
      })
  );

  return el;
}

export function Main({}) {
  return createElement('main', { className: 'main flex flex-col flex-1' }, '');
}

export function Footer({}) {
  return createElement(
    'div',
    { className: 'footer my-4' },
    createElement(
      'a',
      {
        className: 'link',
        href: 'http://github.com/asdqdsa',
        target: '_blank',
      },
      '2025 @ asdqdsa'
    )
  );
}

export function title() {
  return createElement('h1', { className: 'ty-h2' }, 'box');
}
