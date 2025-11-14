import { loadState, saveState } from '@/shared/storage';

import { LOCAL_STORAGE_KEY_LANGS } from './constants';

/** @typedef {import('./types').LangState} LangState */

/**
 * @param {LangState} state State
 * @returns {void}
 */
export function setLangState(state) {
  saveState(LOCAL_STORAGE_KEY_LANGS, state);
}

/**
 * @returns {LangState | null}
 */
export function getLangState() {
  return /** @type {LangState | null} */ (loadState(LOCAL_STORAGE_KEY_LANGS));
}
