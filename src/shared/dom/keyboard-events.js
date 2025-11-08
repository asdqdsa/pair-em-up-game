import { events } from '@/shared/event/event-broker';

import { lock } from '../utils/async/lock';

window.addEventListener('keydown', (e) => {
  if (e.repeat || lock.status) return;
  console.log('keydown', e.code);
  events.emit('key:down', e.code.replace('Key', '').toLowerCase());
});

window.addEventListener('keyup', (e) => {
  if (lock.status) return;
  console.log('keyup', e.code);
  events.emit('key:up', e.code.replace('Key', '').toLowerCase());
});
