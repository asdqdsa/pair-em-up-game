import { GAME_ACTIONS } from '../constants';
import { gameState } from '../state/runtimeState';
import { assistAddNumbers } from './add-numbers';
import { assistHint } from './assist-hint';
import { handleCellClick } from './handle-cell-click';
import { startNewGame } from './start-new-game';

export function onGameActionDispatcher({ type, payload }) {
  console.log('Game action', type, payload);

  switch (type) {
    case GAME_ACTIONS.CELL_CLICKED:
      handleCellClick({ payload });
      break;

    case GAME_ACTIONS.GAME_START:
      startNewGame({ mode: gameState.mode });
      break;

    case GAME_ACTIONS.ASSIST_ADD_NUMBERS:
      assistAddNumbers({ mode: payload });
      break;

    case GAME_ACTIONS.ASSIST_HINT:
      assistHint();
      break;

    case GAME_ACTIONS.ASSIST_UNDO:
      // assistUndo();
      break;

    case GAME_ACTIONS.ASSIST_SHUFFLE:
      // assistShuffle();
      break;

    case GAME_ACTIONS.ASSIST_ERASE:
      // assistErase();
      break;

    default:
      console.log(`Unhandled game action type: ${type}`);
      break;
  }
}
