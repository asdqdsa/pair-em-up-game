import { createElement } from '@/shared/dom/create-element';
import { APP_EVENTS } from '@/shared/event/events';
import { GAME_MODES } from '@/features/game/game-modes';
import { appCtx } from '@/app/context/context';

import { GRID_EVENTS } from './constants';
import { getGameGrid } from './lib';

export function GameScreen({ events }) {
  const { currMode } = appCtx.get();
  return createElement(
    'div',
    {
      id: 'start-screen',
      className: 'flex flex-col items-center justify-center',
    },
    GameGrid({ events, mode: currMode })
  );
}

export function GameGrid({ events, mode }) {
  const grid = getGameGrid({ mode: GAME_MODES[mode.toUpperCase()] });
  const el = createElement(
    'div',
    {
      className: 'game-grid',
      onClick: () => {
        // console.log('clicked');
      },
    },

    grid.map((cell) =>
      GameGridCell({
        events,
        onClick: () =>
          events.emit(APP_EVENTS.UI_GAME_GRID_ACTION, GRID_EVENTS.CELL_CLICKED),
        children: cell,
      })
    )
  );
  return el;
}

export function GameGridCell({ events, onClick = (e) => {}, children }) {
  // console.log('cell ', children);
  const el = createElement(
    'div',
    {
      className: 'game-grid-cell',
      onClick,
    },
    children
  );

  return el;
}
