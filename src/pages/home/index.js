import '@/shared/dom/keyboard-events';

import { events } from '@/shared/event/event-broker';

// const app = render(App, root);
// mount(Header, app);
// mount(Title, app);
// mount(Main, app);
// mount(ThemeButton({ events }), app);
// mount(Footer, app);

events.all(({ event, detail }) => {
  console.log('*', event, detail);
});
