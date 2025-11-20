import { gameState } from '@/features/game/state/runtimeState';
import { createElement } from '@/shared/dom/create-element';

export function GameGridCell({ key, onClick = () => {}, children }) {
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
