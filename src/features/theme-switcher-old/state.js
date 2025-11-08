/**
 * @typedef {Object} ThemeState
 * @property {'default' | 'dark' | 'light' | 'gold' | null} activeTheme
 * @property {boolean} [isFirstLoad]
 */

import { getThemeState, setThemeState } from './storage';

function initThemeState() {
  /** @type {ThemeState} Theme State */
  const initialState = {
    activeTheme: 'default',
    isFirstLoad: true,
  };

  setThemeState(initialState);
  return initialState;
}

export function loadThemeState() {
  const stale = getThemeState();
  const fresh = stale ? { ...stale, isFirstLoad: false } : initThemeState();
  return fresh;
}

export function updateThemeState({ activeTheme }) {
  const stale = loadThemeState();
  const fresh = { ...stale, activeTheme };
  setThemeState(fresh);
  return fresh;
}
