import '@/shared/dom/keyboard-events';

import { ThemeButton } from '@/features/theme-switcher';
import { initTheme as initThemeStore } from '@/features/theme-switcher/controller';
import { createElement } from '@/shared/dom/create-element';
import { mount, render } from '@/shared/dom/render';
import { events } from '@/shared/event/event-broker';

const root = document.querySelector('#root');
initThemeStore({ root });

export function App() {
  return createElement('div', {
    className: 'flex flex-col flex-1 items-center',
    id: 'app',
  });
}

export function Header() {
  return createElement('div', { className: 'header my-10 ty-h1' }, 'DASH');
}

export function Main() {
  return createElement('div', { className: 'page' }, '');
}

export function Footer() {
  return createElement('div', { className: 'footer my-4' }, '2025@asdqdsa');
}

export function Title() {
  return createElement('h1', { className: 'ty-h2' }, 'BOX');
}

const app = render(App, root);
mount(Header, app);
mount(Title, app);
mount(Main, app);
mount(ThemeButton({ events }), app);
mount(Footer, app);
