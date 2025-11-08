import { loadState, saveState } from '@/shared/storage';

import { LOCAL_STORAGE_KEY_THEMES } from './constants';

/** @typedef {import('./types').ThemeState} ThemeState */

/**
 * @param {ThemeState} state State
 * @returns {void}
 */
export function setThemeState(state) {
  saveState(LOCAL_STORAGE_KEY_THEMES, state);
}

/**
 * @returns {ThemeState | null}
 */
export function getThemeState() {
  return /** @type {ThemeState | null} */ (loadState(LOCAL_STORAGE_KEY_THEMES));
}
