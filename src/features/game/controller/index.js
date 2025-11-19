import { GRID_EVENTS } from '../constants';
import { handleCellClick } from './handle-cell-click';

export function handleGameAction({ type, payload, events }) {
  console.log('Game action', type, payload);

  switch (type) {
    case GRID_EVENTS.UI_CELL_CLICKED: {
      handleCellClick({ payload });
      break;
    }

    default:
      console.log(`Unhandled action type: ${type}`);
      break;
  }
}
