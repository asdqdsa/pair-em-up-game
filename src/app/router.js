import { GameScreen } from '@/pages/home/game/game-screen';
import { StartScreen } from '@/pages/home/start/start-screen';
import { SettingsScreen } from '@/pages/home/settings/SettingsScreen';
import { render, rerender } from '@/shared/dom/render';
import { APP_EVENTS } from '@/shared/event/events';
import { UIModal } from '@/shared/uikit/components/UIModal';
import { StatsScreen } from '@/pages/home/stats/StatsScreen';
import { startNewGame } from '@/features/game/controller/start-new-game';
import { continueGame } from '@/features/game/controller/continue-game';

import { appCtx } from './context/context';
import { Header } from './layout';
import { ROUTER_ACTIONS, SCREENS } from './screens';

export function initRouter({ events, root, headerRoot }) {
  render(() => StartScreen({ events }), root);

  events.on(APP_EVENTS.LANG_UPDATED, ({ detail }) => {
    render(() => StartScreen({ events }), root);
  });

  events.on(APP_EVENTS.UI_MENU_ACTION, ({ detail }) => {
    const { type, payload } = detail;
    onMenuActionsDispatcher({ type, payload, events, root, headerRoot });
  });

  events.on(APP_EVENTS.GAME_END, () => {
    appCtx.set({ currScreen: SCREENS.STATS });

    // render(() => StatsScreen({ events }), root);

    const modal = UIModal({
      onClose: () => root.removeChild(modal),
      children: StatsScreen({ events }),
    });

    root.append(modal);
  });
}

const onMenuActionsDispatcher = ({
  type,
  payload,
  events,
  root,
  headerRoot,
}) => {
  switch (type) {
    case ROUTER_ACTIONS.MODE: {
      console.log('MODE', payload);
      appCtx.set({ currScreen: SCREENS.GAME, currMode: payload });

      startNewGame({ mode: payload });

      render(() => Header({ events }), headerRoot);
      render(() => GameScreen({ events }), root);
      break;
    }

    case ROUTER_ACTIONS.SETTINGS: {
      appCtx.set({ currScreen: SCREENS.SETTINGS });
      const modal = UIModal({
        onClose: () => root.removeChild(modal),
        children: SettingsScreen({ events }),
      });
      root.append(modal);
      break;
    }

    case ROUTER_ACTIONS.CONTINUE:
      continueGame();

      appCtx.set({ currScreen: SCREENS.GAME });
      render(() => Header({ events }), headerRoot);
      rerender({ root, nodeFn: GameScreen, props: { events } });
      // events.emit(APP_EVENTS.GAME_UPDATED, null);
      // events.emit(APP_EVENTS.GAME_CONTINUE, null);
      break;

    case ROUTER_ACTIONS.STATS: {
      appCtx.set({ currScreen: SCREENS.STATS });
      const modal = UIModal({
        onClose: () => root.removeChild(modal),
        children: StatsScreen({ events }),
      });
      root.append(modal);
      break;
    }

    case ROUTER_ACTIONS.BACK_TO_MENU:
      appCtx.set({ currScreen: SCREENS.START });
      rerender({ root: headerRoot, nodeFn: Header, props: { events } });
      render(() => StartScreen({ events }), root);
      break;

    default:
      console.error('Unknown action type: ', { type, payload });
  }
};
