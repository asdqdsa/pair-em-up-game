import { createElement } from '@/shared/dom/create-element';

import { loadThemeState } from './state';

export function ThemeButton({ events, className }) {
  let { activeTheme } = loadThemeState();

  events.on('theme:changed', ({ detail }) => {
    el.textContent = `${detail}`;
  });

  const el = createElement(
    'button',
    {
      className: `${className}`,
      onClick: () => events.emit('theme:next'),
    },
    `${activeTheme}`
  );

  return el;
}
