import { GAME_ACTIONS } from '../constants';
import { gameState } from '../state/runtimeState';
import { addNumbers } from './add-numbers';
import { handleCellClick } from './handle-cell-click';
import { startNewGame } from './start-new-game';

export function onGameActionDispatcher({ type, payload }) {
  console.log('Game action', type, payload);

  switch (type) {
    case GAME_ACTIONS.CELL_CLICKED: {
      handleCellClick({ payload });
      break;
    }

    case GAME_ACTIONS.ADD_NUMBERS: {
      addNumbers({ mode: payload });
      break;
    }

    case GAME_ACTIONS.GAME_START: {
      startNewGame({ mode: gameState.mode });
      break;
    }

    default:
      console.log(`Unhandled game action type: ${type}`);
      break;
  }
}
