import { GAME_ACTIONS } from '../constants';
import { gameState } from '../state/runtimeState';
import { handleCellClick } from './handle-cell-click';
import { addNumbers, startNewGame } from './start-new-game';

export function onGameActionDispatcher({ type, payload }) {
  console.log('Game action', type, payload);

  switch (type) {
    case GAME_ACTIONS.CELL_CLICKED: {
      handleCellClick({ payload });
      break;
    }

    case GAME_ACTIONS.ADD_NUMBERS: {
      addNumbers();
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
