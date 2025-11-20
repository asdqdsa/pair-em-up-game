import { GAME_ACTIONS } from '@/features/game/constants';
import { gameState } from '@/features/game/state/runtimeState';
import { createElement } from '@/shared/dom/create-element';
import { APP_EVENTS } from '@/shared/event/events';
import { formatTime } from '@/shared/utils/lib';

import { GameGridCell } from './game-grid-cell';

let unbindGameTick;

export function GameGrid({ events }) {
  const grid = gameState.grid;

  const scoreBar = createElement(
    'div',
    { className: 'flex flex-col gap-3 items-center justify-center ' },
    `Score: ${gameState.score} / ${gameState.maxScore}`
  );

  const timerBar = createElement(
    'div',
    { className: 'timer' },
    `Time: ${formatTime(gameState.elapsedSeconds)}`
  );

  const gameGrid = createElement(
    'div',
    { className: 'game-grid' },
    grid.map((cell, idx) =>
      GameGridCell({
        key: idx,
        onClick: () =>
          events.emit(APP_EVENTS.UI_GAME_ACTION, {
            type: GAME_ACTIONS.CELL_CLICKED,
            payload: {
              key: idx,
              value: cell,
            },
          }),
        children: cell,
      })
    )
  );

  const handleTick = ({ detail }) => {
    const seconds = detail.payload ?? gameState.elapsedSeconds;
    console.log('seconds', seconds);
    timerBar.textContent = `Time: ${formatTime(seconds)}`;
  };

  events.on(APP_EVENTS.GAME_TICK, handleTick);
  unbindGameTick = () => events.off(APP_EVENTS.GAME_TICK, handleTick);

  return createElement(
    'div',
    { className: 'game-layout' },
    gameGrid,
    createElement(
      'div',
      { className: 'flex flex-col items-center my-20' },
      scoreBar,
      timerBar
    )
  );
}
