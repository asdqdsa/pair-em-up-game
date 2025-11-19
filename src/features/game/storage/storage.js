import { clearState, loadState, saveState } from '@/shared/storage';

import { LOCAL_STORAGE_KEY_PAIREMUP_GAME } from '../constants';

/**
 * @typedef {import('../state/types').GameState} GameState
 */

/**
 * @typedef {Omit<GameState, 'timerRef'>} GameSnapshot
 */

/**
 * Save game snapshot to LS
 * @param {GameSnapshot} snapshot Game Sanphsot for LS
 * @returns {void}
 */
export function saveGameSnapshot(snapshot) {
  saveState(LOCAL_STORAGE_KEY_PAIREMUP_GAME, snapshot);
}

/**
 * Load game snapshot from LS
 * @returns {GameSnapshot | null}
 */
export function loadGameSnapshot() {
  return /** @type {GameSnapshot | null} */ (
    loadState(LOCAL_STORAGE_KEY_PAIREMUP_GAME)
  );
}

/**
 * Clear game snapshot
 */
export function clearGameSnapshot() {
  clearState(LOCAL_STORAGE_KEY_PAIREMUP_GAME);
}
