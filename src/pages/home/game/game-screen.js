import { appCtx } from '@/app/context/context';
import { GRID_EVENTS } from '@/features/game/constants';
import { handleGameAction, startNewGame } from '@/features/game/controller';
import { gameState } from '@/features/game/state';
import { createElement } from '@/shared/dom/create-element';
import { render, rerender } from '@/shared/dom/render';
import { APP_EVENTS } from '@/shared/event/events';
import { UIButton } from '@/shared/uikit/components/UIButton';

let unbindGridAction;
let unbindGameUpdated;

export function GameScreen({ events }) {
  const gridRoot = createElement('div');
  const { currMode } = appCtx.get();

  if (unbindGridAction) unbindGridAction();
  if (unbindGameUpdated) unbindGameUpdated();

  const handleGridAction = ({ detail }) => {
    const { type, payload } = detail;
    handleGameAction({ type, payload, events });
  };
  events.on(APP_EVENTS.UI_GAME_GRID_ACTION, handleGridAction);

  unbindGridAction = () =>
    events.off(APP_EVENTS.UI_GAME_GRID_ACTION, handleGridAction);

  const handleGameUpdated = () => {
    rerender({
      root: gridRoot,
      nodeFn: GameGrid,
      props: { events, mode: currMode },
    });
  };

  events.on(APP_EVENTS.GAME_UPDATED, handleGameUpdated);

  unbindGameUpdated = () =>
    events.off(APP_EVENTS.GAME_UPDATED, handleGameUpdated);

  render(() => GameGrid({ events, mode: currMode }), gridRoot);
  // render(() => GameGrid({ events, mode: currMode }), gridRoot);

  const el = createElement(
    'div',
    {
      id: 'start-screen',
      className: 'flex flex-col items-center justify-center',
    },
    // GameGrid({ events, mode: currMode })
    gridRoot,
    UIButton({
      className: 'btn',
      onClick: () => {
        startNewGame({ mode: gameState.mode });
        events.emit(APP_EVENTS.GAME_RESET, null);
        events.emit(APP_EVENTS.GAME_UPDATED, null);
      },
      children: 'Reset',
    })
  );

  return el;
}

export function GameGrid({ events, mode }) {
  // const grid = generateGameGrid({ mode: GAME_MODES[mode.toUpperCase()] });

  const grid = gameState.grid;

  const el = createElement(
    'div',
    {
      className: 'game-grid',
      onClick: () => {
        // console.log('clicked');
      },
    },
    grid.map((cell, idx) =>
      GameGridCell({
        events,
        key: idx,
        value: cell,
        onClick: () =>
          events.emit(APP_EVENTS.UI_GAME_GRID_ACTION, {
            type: GRID_EVENTS.UI_CELL_CLICKED,
            payload: {
              key: idx,
              value: cell,
            },
          }),
        children: cell,
      })
    )
  );
  return el;
}

export function GameGridCell({
  events,
  key,
  value,
  onClick = () => {},
  children,
}) {
  // console.log('cell ', children);

  const isSelected = gameState.selectedCells.includes(key);

  const el = createElement(
    'div',
    {
      className: `game-grid-cell pointer ${isSelected ? 'border' : ''}`,
      onClick,
    },
    children === null ? '' : children
  );

  return el;
}
