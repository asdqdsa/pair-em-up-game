import { loadState, saveState } from '@/shared/storage';

import { LOCAL_STORAGE_KEY_THEMES } from './constants';
/**
 * @typedef {Object} ThemeState
 * @property {'default' | 'dark' | 'light' | 'gold' | null} activeTheme
 * @property {boolean} [isFirstLoad]
 */

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
