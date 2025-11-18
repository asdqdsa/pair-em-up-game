import { appCtx } from '@/app/context/context';
import { GRID_EVENTS } from '@/features/game/constants';
import { handleGameAction } from '@/features/game/controller';
import { gameState } from '@/features/game/state';
import { createElement } from '@/shared/dom/create-element';
import { render, rerender } from '@/shared/dom/render';
import { APP_EVENTS } from '@/shared/event/events';

export function GameScreen({ events }) {
  const gridRoot = createElement('div');
  const { currMode } = appCtx.get();

  events.on(APP_EVENTS.UI_GAME_GRID_ACTION, ({ detail }) => {
    const { type, payload } = detail;
    handleGameAction({ type, payload, events });
  });

  events.on(APP_EVENTS.GAME_UPDATED, ({ detail }) => {
    rerender({
      root: gridRoot,
      nodeFn: GameGrid,
      props: {
        events,
        mode: currMode,
      },
    });

    // render(() => GameGrid({ events, mode: currMode }), gridRoot);
  });

  render(() => GameGrid({ events, mode: currMode }), gridRoot);

  const el = createElement(
    'div',
    {
      id: 'start-screen',
      className: 'flex flex-col items-center justify-center',
    },
    // GameGrid({ events, mode: currMode })
    gridRoot
  );

  return el;
}

export function GameGrid({ events, mode }) {
  // const grid = generateGameGrid({ mode: GAME_MODES[mode.toUpperCase()] });

  const grid = gameState.grid;

  console.log('selectedCells3', gameState.selectedCells);
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
