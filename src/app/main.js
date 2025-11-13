import '@/shared/uikit/atomic/atomic.scss';
import '@/app/style.scss';
import '@/pages/home';

import '@/shared/dom/keyboard-events';
import { initTheme } from '@/features/theme-switcher/controller';
import { render } from '@/shared/dom/render';
import { events } from '@/shared/event/event-broker';

import { App } from './layout';

const root = document.querySelector('#root');
initTheme({ root });
render(() => App({ events }), root);
