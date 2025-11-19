/**
 * @typedef {import('../state/types').GameState} GameState
 */

/**
 *
 * @param {GameState} state
 * @returns {Omit<GameState, 'timerRef'>}
 */

export function createSnapshotFromState(state) {
  const { timerRef, ...snapshot } = state;
  return snapshot;
}
