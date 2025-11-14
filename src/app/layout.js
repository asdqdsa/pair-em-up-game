import { ThemeButton } from '@/features/theme-switcher';
import { LanguageButton } from '@/features/lang-switcher';
import { createElement } from '@/shared/dom/create-element';

import { initRouter } from './router';

export function App({ events }) {
  const header = Header({ events });
  const footer = Footer({ events });
  const main = Main({ events });

  const app = createElement(
    'div',
    {
      className: 'flex flex-col flex-1 h-full items-center',
      id: 'app',
    },
    header,
    main,
    footer
  );

  initRouter({ events, root: main });
  return app;
}

export function Header({ events }) {
  return createElement(
    'header',
    { className: 'header my-10 ty-body w-full gap-2 flex justify-end' },
    ThemeButton({ events, className: 'btn-md' }),
    LanguageButton({ events, className: 'btn-md' })
  );
}

export function Main({}) {
  return createElement('main', { className: 'main flex flex-col flex-1' }, '');
}

export function Footer({}) {
  return createElement(
    'footer',
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
