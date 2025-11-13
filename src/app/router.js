import { GameScreen } from '@/pages/home/game/game-screen';
import { StartScreen } from '@/pages/home/start/start-screen';
import { SettingsScreen } from '@/pages/home/settings/SettingsScreen';
import { render } from '@/shared/dom/render';
import { EVENTS } from '@/shared/event/events';
import { ModalUI } from '@/shared/uikit/components/ModalUI';
import { StatsScreen } from '@/pages/home/stats/StatsScreen';

const DISPATCHER_TYPES = {
  MODE: 'mode',
  SETTINGS: 'settings',
  CONTINUE: 'continue',
  STATS: 'stats',
  BACK_TO_MENU: 'back-to-menu',
};

export function initRouter({ events, root }) {
  render(() => StartScreen({ events }), root);

  events.on(EVENTS.UI_MENU_ACTION, ({ detail }) => {
    const { type, payload } = detail;
    dispatcher({ type, payload, events, root });
  });
}

const dispatcher = ({ type, payload, events, root }) => {
  switch (type) {
    case DISPATCHER_TYPES.MODE:
      render(() => GameScreen({ events }), root);
      break;

    case DISPATCHER_TYPES.SETTINGS: {
      const modal = ModalUI({
        onClose: () => root.removeChild(modal),
        children: SettingsScreen({ events }),
      });
      root.append(modal);
      break;
    }

    case DISPATCHER_TYPES.CONTINUE:
      break;

    case DISPATCHER_TYPES.STATS: {
      const modal = ModalUI({
        onClose: () => root.removeChild(modal),
        children: StatsScreen({ events }),
      });
      root.append(modal);
      break;
    }

    case DISPATCHER_TYPES.BACK_TO_MENU:
      render(() => StartScreen({ events }), root);
      break;

    default:
      console.error('Unknown action type: ', { type, payload });
  }
};
