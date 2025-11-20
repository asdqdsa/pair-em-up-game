import { appCtx } from '@/app/context/context';
import { GAME_ACTIONS } from '@/features/game/constants';
import { onGameActionDispatcher } from '@/features/game/controller';
import { saveGame } from '@/features/game/controller/save-game';
import { gameState } from '@/features/game/state/runtimeState';
import { AssistToolbar } from '@/features/game/ui/assist-toolbar';
import { createElement } from '@/shared/dom/create-element';
import { render, rerender } from '@/shared/dom/render';
import { APP_EVENTS } from '@/shared/event/events';
import { UIButton } from '@/shared/uikit/components/UIButton';

import { GameGrid } from './game-grid';

let unbindGridAction;
let unbindGameUpdated;

export function GameScreen({ events }) {
  const gridRoot = createElement('div');
  const assistsRoot = createElement('div');
  const { currMode } = appCtx.get();
  const mode = currMode ?? gameState.mode;

  if (unbindGridAction) unbindGridAction();
  if (unbindGameUpdated) unbindGameUpdated();

  const handleGameAction = ({ detail }) => {
    const { type, payload } = detail;
    onGameActionDispatcher({ type, payload });
  };
  events.on(APP_EVENTS.UI_GAME_ACTION, handleGameAction);

  unbindGridAction = () =>
    events.off(APP_EVENTS.UI_GAME_ACTION, handleGameAction);

  const handleGameUpdated = () => {
    rerender({
      root: gridRoot,
      nodeFn: GameGrid,
      props: { events, mode },
    });

    render(() => AssistToolbar({ events, mode }), assistsRoot);
  };

  events.on(APP_EVENTS.GAME_UPDATED, handleGameUpdated);

  unbindGameUpdated = () =>
    events.off(APP_EVENTS.GAME_UPDATED, handleGameUpdated);

  render(() => GameGrid({ events }), gridRoot);
  render(() => AssistToolbar({ events, mode }), assistsRoot);

  const modeBadge = createElement(
    'div',
    { className: 'game-mode-badge ty-body-sm' },
    `${mode?.toUpperCase()}`
  );

  const el = createElement(
    'div',
    {
      id: 'start-screen',
      className: 'flex flex-col items-center gap-2 justify-center',
    },
    // GameGrid({ events, mode: currMode })
    modeBadge,
    gridRoot,
    assistsRoot,
    // AssistToolbar({ events, mode: currMode }),
    UIButton({
      className: 'btn',
      onClick: () => {
        saveGame();
        events.emit(APP_EVENTS.GAME_UPDATED, null);
      },
      children: 'Save',
    }),

    UIButton({
      className: 'btn',
      onClick: () => {
        // startNewGame({ mode: gameState.mode });

        events.emit(APP_EVENTS.UI_GAME_ACTION, {
          type: GAME_ACTIONS.GAME_START,
          payload: gameState.mode,
        });
        events.emit(APP_EVENTS.GAME_RESET, null);
        events.emit(APP_EVENTS.GAME_UPDATED, null);
      },
      children: 'Reset',
    })
  );

  return el;
}
