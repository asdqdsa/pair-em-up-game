import { createElement } from '@/shared/dom/create-element';
import { EVENTS } from '@/shared/event/events';

import { GRID_COMMANDS } from './constants';

export const getGameGrid = ({ mode = 'classic' }) => {
  const list = Array.from({ length: 27 }, (_, i) => String(i + 1));
  return list;
};

export function GameScreen({ events }) {
  return createElement(
    'div',
    {
      id: 'start-screen',
      className: 'flex flex-col items-center justify-center',
    },
    GameGrid({ events })
  );
}

export function GameGrid({ events }) {
  const grid = getGameGrid({ mode: 'classic' });
  const el = createElement(
    'div',
    {
      className: 'game-grid',
      onClick: () => console.log('clicked'),
    },

    grid.map((cell) =>
      GameGridCell({
        events,
        onClick: () =>
          events.emit(EVENTS.UI_GAME_GRID_ACTION, GRID_COMMANDS.CELL_CLICKED),
        children: cell,
      })
    )
  );
  return el;
}

export function GameGridCell({ events, onClick = (e) => {}, children }) {
  console.log('cell ', children);
  const el = createElement(
    'div',
    {
      className: 'game-grid-cell',
      onClick: (e) => {
        e.stopPropagation();
        onClick(e);
      },
    },
    children
  );

  return el;
}
